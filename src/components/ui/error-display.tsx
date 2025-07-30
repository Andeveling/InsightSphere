import { AlertCircle, XCircle, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorDisplayProps {
  message?: string
  errors?: string[]
  type?: 'error' | 'warning' | 'info'
  className?: string
  onDismiss?: () => void
}

export function ErrorDisplay({ 
  message, 
  errors,
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

  // Determine what to display
  const displayErrors = errors || (message ? [message] : [])
  
  if (displayErrors.length === 0) {
    return null
  }

  return (
    <div 
      className={cn(
        'flex items-start space-x-2 text-sm p-3 rounded-md border',
        styles[type],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1">
        {displayErrors.length === 1 ? (
          <p>{displayErrors[0]}</p>
        ) : (
          <ul className="space-y-1">
            {displayErrors.map((error, index) => (
              <li key={index} className="list-disc list-inside">
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
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
