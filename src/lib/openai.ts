import { Message } from '../types/chat'
import { CvData } from '../types/cv'
import { createSystemPrompt } from '../config/systemPrompt'
import { fallbackRespond } from './fallbackResponder'

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

/**
 * Sends a chat message to Google Gemini 2.0 Flash via the OpenAI-compatible Chat Completions API,
 * or uses local fallback responder if LLM is disabled or API key is missing (demo mode).
 * 
 * Uses the OpenAI-compatible endpoint at:
 * https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
 * 
 * Environment Variables:
 * - VITE_USE_LLM: Set to "true" to enable LLM mode (default: "false" for demo mode)
 * - VITE_GOOGLE_API_KEY: Your Gemini API key (required only if USE_LLM is true)
 * - VITE_LLM_MODEL: Model name (defaults to 'gemini-2.0-flash')
 * 
 * Demo Mode (default):
 * - Works without any API key
 * - Uses local fallback responder based on CV data
 * - No network calls, no errors
 * 
 * AI Mode (USE_LLM=true):
 * - Requires VITE_GOOGLE_API_KEY to be set
 * - Makes real API calls to Gemini
 * - Falls back to demo mode if key is missing
 * 
 * @param messages - Array of conversation messages
 * @param cvData - CV data to include in system prompt (or for fallback responses)
 * @param topic - Optional topic for context-specific responses
 * @returns The assistant's reply text
 */
export async function sendChatMessage(
  messages: Message[],
  cvData: CvData,
  topic?: string
): Promise<string> {
  // Check if LLM mode is enabled
  const useLlm = import.meta.env.VITE_USE_LLM === 'true'
  
  // Read the API key (VITE_GOOGLE_API_KEY is the required variable for Vite)
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || ''
  const trimmedKey = apiKey?.trim()
  const hasValidKey = trimmedKey && trimmedKey !== '' && trimmedKey !== 'REPLACE_WITH_YOUR_REAL_KEY'

  // Debug: Log mode status in development
  if (import.meta.env.DEV) {
    console.log('[CV Chatbot] Mode check:', {
      useLlm,
      hasValidKey,
      mode: useLlm && hasValidKey ? 'AI Mode (Gemini)' : 'Demo Mode (Local)',
    })
  }

  // Demo mode: Use local fallback responder (no API calls)
  if (!useLlm || !hasValidKey) {
    const lastUserMessage = messages.length > 0 
      ? messages[messages.length - 1]?.content || ''
      : ''
    
    // Use fallback responder (synchronous, no network calls)
    return fallbackRespond(cvData, { topic, lastUserMessage })
  }

  // AI Mode: Use real Gemini API
  // Read the model name (VITE_LLM_MODEL is the preferred variable for Vite)
  const model = import.meta.env.VITE_LLM_MODEL || 'gemini-2.0-flash'

  // Build system prompt
  let systemPrompt = createSystemPrompt(cvData)
  
  // Add topic-specific context if provided
  if (topic) {
    systemPrompt += `\n\nUser is asking about: ${topic}. Provide a focused response on this topic.`
  }

  // Format messages for OpenAI-compatible API
  const chatMessages = [
    {
      role: 'system' as const,
      content: systemPrompt,
    },
    ...messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
  ]

  try {
    // Gemini OpenAI-compatible endpoint
    // The OpenAI-compatible API requires Bearer token authentication in the Authorization header
    const baseUrl = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
    
    const requestBody = {
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500,
    }

    // Log request details in dev mode (without exposing the key)
    if (import.meta.env.DEV) {
      console.log('[CV Chatbot] API Request:', {
        endpoint: baseUrl,
        model,
        messageCount: chatMessages.length,
        hasApiKey: !!trimmedKey,
        apiKeyLength: trimmedKey.length,
        authMethod: 'Bearer-token',
      })
    }

    // Use Bearer token in Authorization header (required for OpenAI-compatible endpoint)
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${trimmedKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    // Get response text first to see what we're dealing with
    const responseText = await response.text()
    
    if (!response.ok) {
      // Try to parse as JSON, but handle non-JSON responses
      let errorData: any
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { error: { message: responseText || response.statusText } }
      }

      // Log full error details in dev mode
      if (import.meta.env.DEV) {
        console.error('[CV Chatbot] API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          responseText: responseText.substring(0, 1000), // First 1000 chars for debugging
          headers: Object.fromEntries(response.headers.entries()),
        })
      }

      // Extract error message from various possible formats
      const errorMessage = 
        errorData?.error?.message ||
        errorData?.message ||
        errorData?.error ||
        (typeof errorData === 'string' ? errorData : null) ||
        responseText ||
        `HTTP ${response.status}: ${response.statusText}`

      // Provide more helpful error messages for common issues
      let userFriendlyError = errorMessage
      if (response.status === 401 || response.status === 403) {
        userFriendlyError = `Authentication failed. Please check your API key is correct and has the necessary permissions. Error: ${errorMessage}`
      } else if (response.status === 400) {
        userFriendlyError = `Invalid request. ${errorMessage}. Please check the model name "${model}" is correct.`
      } else if (response.status === 404) {
        userFriendlyError = `API endpoint not found. Please check the model name "${model}" is correct for Gemini.`
      } else if (response.status === 429) {
        // Extract retry delay from error details if available
        let retryInfo = ''
        if (errorData?.details) {
          const retryDetail = errorData.details.find((d: any) => d['@type']?.includes('RetryInfo'))
          if (retryDetail?.retryDelay) {
            const delaySeconds = parseInt(retryDetail.retryDelay.replace('s', '')) || 0
            retryInfo = ` Please wait ${Math.ceil(delaySeconds)} seconds before trying again.`
          }
        }
        
        // Check if it's a quota issue
        const isQuotaExceeded = errorMessage.toLowerCase().includes('quota') || 
                                errorMessage.toLowerCase().includes('exceeded your current quota')
        
        if (isQuotaExceeded) {
          userFriendlyError = `API quota exceeded. ${retryInfo}\n\n` +
            `The model "${model}" may not be available on your current plan, or you've reached your daily/monthly limit.\n\n` +
            `Solutions:\n` +
            `1. Wait for the quota to reset (usually daily)\n` +
            `2. Try a different model (e.g., "gemini-1.5-flash" or "gemini-1.5-pro")\n` +
            `3. Check your usage: https://ai.dev/usage?tab=rate-limit\n` +
            `4. Upgrade your plan if needed\n\n` +
            `Original error: ${errorMessage}`
        } else {
          userFriendlyError = `Rate limit exceeded.${retryInfo} ${errorMessage}`
        }
      } else if (response.status === 500 || response.status === 502 || response.status === 503) {
        userFriendlyError = `Server error from Gemini API. Please try again later. ${errorMessage}`
      }

      throw new Error(userFriendlyError)
    }

    // Parse successful response
    let data: ChatCompletionResponse
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      if (import.meta.env.DEV) {
        console.error('[CV Chatbot] Parse Error:', {
          parseError,
          responseText: responseText.substring(0, 500),
        })
      }
      throw new Error(`Failed to parse API response: ${responseText.substring(0, 200)}`)
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      if (import.meta.env.DEV) {
        console.error('[CV Chatbot] Unexpected Response Format:', data)
      }
      throw new Error(`Unexpected API response format: ${JSON.stringify(data).substring(0, 200)}`)
    }

    return data.choices[0].message.content || 'Sorry, I could not generate a response.'
  } catch (error) {
    if (error instanceof Error) {
      // Log network errors in dev mode
      if (import.meta.env.DEV) {
        console.error('[CV Chatbot] Request Error:', {
          message: error.message,
          name: error.name,
          stack: error.stack?.substring(0, 500),
        })
      }
      throw error
    }
    throw new Error('Failed to send message to Gemini API')
  }
}

