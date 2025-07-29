import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnProfile = nextUrl.pathname.startsWith('/profile')
      const isOnTeam = nextUrl.pathname.startsWith('/team')
      const isOnGame = nextUrl.pathname.startsWith('/game')
      const isOnLogin = nextUrl.pathname.startsWith('/login')

      // Protect dashboard, profile, team, and game routes
      if (isOnDashboard || isOnProfile || isOnTeam || isOnGame) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogin) {
        // Redirect authenticated users away from login page
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
