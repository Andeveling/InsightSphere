'use server'

import { signIn, signOut } from '../lib/auth'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { redirect } from 'next/navigation'

// Validation schema for login form
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Validate form data
    const validatedFields = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!validatedFields.success) {
      return 'Invalid form data. Please check your inputs.'
    }

    // Attempt to sign in
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    })

    // If successful, redirect to dashboard
    redirect('/dashboard')
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials. Please check your email and password.'
        default:
          return 'Something went wrong. Please try again.'
      }
    }
    throw error
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: '/' })
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}
