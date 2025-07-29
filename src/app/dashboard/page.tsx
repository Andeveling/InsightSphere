import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navigation from '@/components/ui/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen font-sans text-foreground bg-background flex flex-col items-center">
      <Navigation />
      <main className="w-full flex justify-center py-12 px-2 sm:px-4 lg:px-8">
        <div className="w-full max-w-5xl rounded-xl shadow p-10 border border-border bg-card">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Welcome to your Dashboard
          </h1>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Hello, <span className="font-semibold text-foreground">{session.user.name}</span>!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 text-primary text-lg">
                  Your Profile
                </h3>
                <p className="text-base text-muted-foreground">
                  Complete your High 5 strengths profile
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 text-green-700 dark:text-green-400 text-lg">
                  Team Activity
                </h3>
                <p className="text-base text-muted-foreground">
                  Participate in team strength discovery
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400 text-lg">
                  Reports
                </h3>
                <p className="text-base text-muted-foreground">
                  View your teams collective insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
