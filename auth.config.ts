import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'
import type { User } from '@prisma/client'

// Validation schema for credentials
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        team: true,
        userStrengths: {
          include: {
            strength: {
              include: {
                domain: true
              }
            }
          }
        }
      }
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnProfile = nextUrl.pathname.startsWith('/profile')
      const isOnTeam = nextUrl.pathname.startsWith('/team')
      const isOnGame = nextUrl.pathname.startsWith('/game')
      const isOnLogin = nextUrl.pathname.startsWith('/')

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
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email',
          placeholder: 'email@example.com'
        },
        password: { 
          label: 'Password', 
          type: 'password',
          placeholder: '••••••••'
        },
      },
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)
          
          if (!user) return null
          
          const passwordsMatch = await bcrypt.compare(password, user.hashedPassword)
          
          if (passwordsMatch) {
            // Return user object without password
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { hashedPassword: _, ...userWithoutPassword } = user
            return {
              id: userWithoutPassword.id,
              email: userWithoutPassword.email,
              name: userWithoutPassword.name,
            }
          }
        }

        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})
