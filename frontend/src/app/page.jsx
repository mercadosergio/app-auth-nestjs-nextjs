'use client'
import { useSelector } from 'react-redux'
import styles from './home.module.css'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Loading from './loading'
import Header from '@/components/Header/Header'
import { useRouter } from 'next/router'

function Home() {
	const { data: session, status } = useSession()
	const router = useRouter()
	if (status == 'loading') return <Loading />
	if (!session) {
		router.push('/auth/login')
	}
	const UsersTable = dynamic(
		() => import('./../components/UsersTable/UsersTable'),
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
						<UsersTable accessToken={session.user?.access_token} />
					</div>
					<Link href='/auth/register'>Ir a register</Link>
				</section>
			</div>
		</main>
	)
}

export default Home
