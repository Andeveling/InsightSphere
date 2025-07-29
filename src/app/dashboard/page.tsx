import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navigation from '@/components/ui/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to your Dashboard
          </h1>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Hello, <span className="font-semibold">{session.user.name}</span>!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Your Profile
                </h3>
                <p className="text-blue-700 text-sm">
                  Complete your High 5 strengths profile
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  Team Activity
                </h3>
                <p className="text-green-700 text-sm">
                  Participate in team strength discovery
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">
                  Reports
                </h3>
                <p className="text-purple-700 text-sm">
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
