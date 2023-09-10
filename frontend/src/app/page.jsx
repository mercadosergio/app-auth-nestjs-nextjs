'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

function RoutePage() {
	const router = useRouter()

	const { sessionExists } = useAuth()
	const isSession = sessionExists()
	
	useEffect(() => {
		if (!isSession) {
			router.push('/auth/login')
		} else {
			router.push('/home')
		}
	}, [])

	return <></>
}

export default RoutePage
