'use client'
import { useRouter } from 'next/navigation'
import Loading from './loading'
import { useSession } from 'next-auth/react'

function App() {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (!session) {
		router.push('/auth/login')
	} else {
		router.push('/home')
	}

	return <Loading />
}

export default App
