'use client'

import { useActionState } from 'react'
import { authenticate } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react'
import { useState } from 'react'

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="space-y-4" role="form" aria-label="Login form">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            className="pl-10"
            required
            disabled={isPending}
            aria-describedby={errorMessage ? "error-message" : undefined}
            aria-invalid={errorMessage ? "true" : "false"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="pl-10 pr-10"
            required
            minLength={6}
            disabled={isPending}
            aria-describedby="password-help"
            aria-invalid={errorMessage ? "true" : "false"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isPending}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        <p id="password-help" className="text-xs text-muted-foreground">
          Password must be at least 6 characters long
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isPending}
        aria-describedby={isPending ? "loading-message" : undefined}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span id="loading-message">Signing in...</span>
          </>
        ) : (
          'Sign in'
        )}
      </Button>

      {errorMessage && (
        <div 
          id="error-message"
          className="flex items-center space-x-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground" role="region" aria-label="Test credentials">
        <p>Test credentials:</p>
        <p className="font-mono text-xs">
          ana.garcia@insightsphere.com / password123
        </p>
      </div>
    </form>
  )
}
