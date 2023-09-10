import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/config/environment'
import Cookies from 'js-cookie'

const getAuthToken = () => {
	const token = Cookies.get('next-app-auth-token')
	return token
}

export const authApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}/`,
		prepareHeaders: (headers) => {
			const token = getAuthToken()

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}

			return headers
		},
	}),
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => 'auth/profile',
		}),
	}),
})

export const { useGetProfileQuery } = authApi
