import { AlertCircle, XCircle, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorDisplayProps {
  message: string
  type?: 'error' | 'warning' | 'info'
  className?: string
  onDismiss?: () => void
}

export function ErrorDisplay({ 
  message, 
  type = 'error', 
  className,
  onDismiss 
}: ErrorDisplayProps) {
  const icons = {
    error: XCircle,
    warning: AlertTriangle,
    info: AlertCircle,
  }

  const styles = {
    error: 'text-destructive bg-destructive/10 border-destructive/20',
    warning: 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/20 dark:border-orange-800',
    info: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-800',
  }

  const Icon = icons[type]

  return (
    <div 
      className={cn(
        'flex items-center space-x-2 text-sm p-3 rounded-md border',
        styles[type],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <p className="flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss error"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay
