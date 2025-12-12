import { useState, useRef, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { Message, QuickAction } from '../../types/chat'
import { CvData } from '../../types/cv'
import { sendChatMessage } from '../../lib/openai'
import ChatWindow from './ChatWindow'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import QuickActions from './QuickActions'

interface CvChatbotProps {
  cvData: CvData
  quickActions: QuickAction[]
  title?: string
  placeholder?: string
  buttonLabel?: string
  externalOpenTrigger?: number // When this changes, open the chat
}

const INITIAL_GREETING = "Hi! I'm here to help you learn about my background, experience, projects, and skills. Feel free to ask me anything, or use the quick action buttons below to get started!"

// Helper function to create the initial greeting message
function createInitialMessage(): Message {
  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: INITIAL_GREETING,
    timestamp: new Date(),
  }
}

export default function CvChatbot({
  cvData,
  quickActions,
  title = 'CV Assistant',
  placeholder = 'Ask me anything...',
  buttonLabel = 'CV Assistant',
  externalOpenTrigger,
}: CvChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Open chat when external trigger changes
  useEffect(() => {
    if (externalOpenTrigger !== undefined && externalOpenTrigger > 0) {
      setIsOpen(true)
    }
  }, [externalOpenTrigger])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // Ref to always have access to the latest messages for API calls
  const messagesRef = useRef<Message[]>([])

  // Keep messagesRef in sync with messages state
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // Show initial greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([createInitialMessage()])
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Check if we're in demo mode (computed once per render)
  const isDemoMode = (() => {
    const useLlm = import.meta.env.VITE_USE_LLM === 'true'
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || ''
    const trimmedKey = apiKey.trim()
    const hasValidKey = trimmedKey && trimmedKey !== '' && trimmedKey !== 'REPLACE_WITH_YOUR_REAL_KEY'
    return !useLlm || !hasValidKey
  })()

  const handleSendMessage = async (content: string, topic?: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    // Compute the updated messages array with the new user message
    // Use the ref to get the latest messages, ensuring we have the most current state
    const updatedMessages = [...messagesRef.current, userMessage]
    
    // Update state with the new user message
    setMessages(updatedMessages)
    setIsLoading(true)
    setError(null)

    try {
      // Use the computed updatedMessages array instead of the stale 'messages' variable
      // This ensures the API receives the complete conversation history including the new user message
      // In demo mode, this will use the local fallback responder (no network calls)
      const response = await sendChatMessage(updatedMessages, cvData, topic)
      
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      // In demo mode, errors should be rare (fallback responder doesn't throw)
      // But handle them gracefully if they occur
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.'
      setError(errorMessage)
      
      const errorMsg: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.label, action.topic)
  }

  const handleResetChat = () => {
    // Reset messages to initial greeting state
    setMessages([createInitialMessage()])
    setError(null)
    // Scroll to top (the greeting message will be at the top)
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
          aria-label="Open CV Assistant"
        >
          <MessageCircle size={20} />
          <span className="font-medium">{buttonLabel}</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          title={title}
          onClose={() => setIsOpen(false)}
          onResetChat={handleResetChat}
          messages={messages}
          isLoading={isLoading}
          error={error}
          quickActions={quickActions}
          onQuickAction={handleQuickAction}
          onSendMessage={handleSendMessage}
          placeholder={placeholder}
          messagesEndRef={messagesEndRef}
          isDemoMode={isDemoMode}
        />
      )}
    </>
  )
}
