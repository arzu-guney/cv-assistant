import { QuickAction } from '../../types/chat'

interface QuickActionsProps {
  actions: QuickAction[]
  onAction: (action: QuickAction) => void
}

export default function QuickActions({ actions, onAction }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.topic}
          onClick={() => onAction(action)}
          className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-full transition-colors active:scale-95"
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
