import { API_URL } from '@/config/environment'
import axios from 'axios'
import { useToken } from './useToken'
import { useState } from 'react'

function useAuth() {
	const authApiUrl = `${API_URL}/auth`
	const [errors, setErrors] = useState(null || [])
	const { setSession, getSession, existsSessionToken, destroySession } =
		useToken('next-app-auth-token', 'next-app-auth-session')

	const login = async (email, password) => {
		try {
			const response = await axios.post(
				`${authApiUrl}/login`,
				{
					email,
					password,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			setSession(response.data.access_token)
		} catch (error) {
			if (error.response && error.response.data) {
				console.log(error.response.data.message)
			} else {
				console.log(errors)
			}
			return
		}
	}

	const sessionExists = () => {
		const authSession = existsSessionToken()

		if (authSession) {
			return true
		} else {
			return false
		}
	}

	const getToken = () => {
		const { accessToken, session } = getSession()

		if (accessToken && session) {
			return accessToken
		}
	}

	const logout = async () => {
		destroySession()
	}

	return { login, logout, errors, setErrors, sessionExists, getToken }
}

export { useAuth }
