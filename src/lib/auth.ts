import NextAuth from 'next-auth'
import { authConfig } from '../../auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'
import type { User } from '@prisma/client'

// Validation schema for credentials
const credentialsSchema = z.object({
  email: z.email(),
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

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
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
            return userWithoutPassword
          }
        }

        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})
