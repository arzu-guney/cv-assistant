import { X, RotateCcw } from 'lucide-react'
import { Message, QuickAction } from '../../types/chat'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import QuickActions from './QuickActions'

interface ChatWindowProps {
  title: string
  onClose: () => void
  onResetChat: () => void
  messages: Message[]
  isLoading: boolean
  error: string | null
  quickActions: QuickAction[]
  onQuickAction: (action: QuickAction) => void
  onSendMessage: (content: string, topic?: string) => void
  placeholder: string
  messagesEndRef: React.RefObject<HTMLDivElement>
  isDemoMode?: boolean
}

export default function ChatWindow({
  title,
  onClose,
  onResetChat,
  messages,
  isLoading,
  error,
  quickActions,
  onQuickAction,
  onSendMessage,
  placeholder,
  messagesEndRef,
  isDemoMode = false,
}: ChatWindowProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[600px] max-h-[80vh] bg-slate-900 rounded-lg shadow-2xl flex flex-col border border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 rounded-t-lg">
        <h2 className="text-lg font-semibold text-slate-50">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetChat}
            className="inline-flex items-center justify-center rounded-full p-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
            aria-label="Start a new chat"
          >
            <RotateCcw size={18} className="text-slate-400" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} isLoading={isLoading} />
        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-2 rounded">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <QuickActions actions={quickActions} onAction={onQuickAction} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900 rounded-b-lg">
        <MessageInput
          onSend={onSendMessage}
          placeholder={placeholder}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
