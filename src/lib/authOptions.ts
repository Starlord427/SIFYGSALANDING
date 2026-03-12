// src/lib/authOptions.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const INACTIVE_TIMEOUT = 15 * 60 // 15 minutos en segundos

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        })

        if (!user || user.status === 'INACTIVE') return null

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null

        return {
          id:       user.id,
          email:    user.email,
          name:     user.fullName,
          role:     user.role,
        }
      },
    }),
  ],

  session: {
    strategy:   'jwt',
    maxAge:     INACTIVE_TIMEOUT,  // Expira a los 15 min
    updateAge:  0,                 // Actualiza en CADA request para detectar inactividad real
  },

  jwt: {
    maxAge: INACTIVE_TIMEOUT,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id   = token.id
        ;(session.user as any).role = token.role
      }
      return session
    },
  },

  pages: {
    signIn: '/auth',
  },

  secret: process.env.NEXTAUTH_SECRET,
}