import { API_URL } from '@/config/environment'
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email', placeholder: 'test@test.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const response = await axios.post(
					`${API_URL}/auth/login`,
					{
						email: credentials?.email,
						password: credentials?.password,
					},
					{
						headers: { 'Content-Type': 'application/json' },
					}
				)

				const token = await response.data
				if (token.error) {
					throw token
				}
				const session = await {
					...token,
					email: credentials.email,
				}

				return session
			},
			callbacks: {
				redirectTo: '/auth/login',
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user }
		},
		async session({ session, token }) {
			session.user = token
			return session
		},
	},
})

export { handler as GET, handler as POST }
