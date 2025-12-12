/// <reference types="vite/client" />

/**
 * Environment variable type definitions for Vite
 * 
 * In Vite, only environment variables prefixed with VITE_ are exposed to the browser.
 * These variables are available via import.meta.env in the client code.
 * 
 * To set these variables:
 * 1. Create a .env file in the project root (see .env.example)
 * 2. Add your actual values (the .env file is gitignored)
 * 3. Restart the dev server after editing .env
 */
interface ImportMetaEnv {
  // Feature Flags
  readonly VITE_USE_LLM?: string  // Set to "true" to enable AI mode, "false" or unset for demo mode
  
  // Google Gemini API Configuration (required only if VITE_USE_LLM is "true")
  readonly VITE_GOOGLE_API_KEY?: string
  readonly VITE_LLM_MODEL?: string
  
  // Vite built-in variables
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

