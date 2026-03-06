// app/api/auth/[...nextauth]/route.ts
// Reemplaza: pages/api/auth/login.ts y register.ts
// Un solo sistema de autenticación con next-auth + Prisma

import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',      type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Faltan campos obligatorios')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) throw new Error('Credenciales inválidas')

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) throw new Error('Credenciales inválidas')

        return {
          id:       user.id,
          email:    user.email,
          name:     user.fullName,
          role:     user.role,
        }
      },
    }),
  ],

  callbacks: {
    // Agrega el rol al JWT
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as any).role
      }
      return token
    },
    // Expone el rol en la sesión del cliente
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id   = token.id
        ;(session.user as any).role = token.role
      }
      return session
    },
  },

  pages: {
    signIn: '/auth/login', // Tu página de login personalizada
  },

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 horas
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
