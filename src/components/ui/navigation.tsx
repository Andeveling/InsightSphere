'use client'

import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth'
import { LogOut, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Navigation() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              InsightSphere
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <User className="h-4 w-4" />
              <span>{session.user.name}</span>
            </div>
            
            <form action={handleLogout}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}
