import { Suspense } from 'react'
import LoginForm from '@/components/ui/login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
              InsightSphere
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              Sign in to access your High 5 strengths profile
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Suspense fallback={
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            }>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
