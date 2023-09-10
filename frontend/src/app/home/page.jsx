'use client'
import { useRouter } from 'next/navigation'
import Loading from '../loading'
import styles from './home.module.css'
import dynamic from 'next/dynamic'
import Header from '@/components/Header/Header'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

function Home() {
	const router = useRouter()

	const { sessionExists, getToken } = useAuth()
	const isSession = sessionExists()

	const accessToken = getToken()
	
	useEffect(() => {
		if (!isSession) {
			router.push('/auth/login')
		}
	}, [])

	const UsersTable = dynamic(
		() => import('./../../components/UsersTable/UsersTable'),
		{
			loading: () => <Loading />,
		}
	)

	return (
		<main className={styles.imageSection1}>
			<div className={styles.backGround}>
				<Header />
				<section className={styles.homeSection}>
					<div className={styles.homeContent}>
						<h1 className={styles.title}>Welcome!!!</h1>
						<UsersTable accessToken={accessToken} />
					</div>
					<Link href='/auth/register'>Ir a register</Link>
				</section>
			</div>
		</main>
	)
}
export default Home
