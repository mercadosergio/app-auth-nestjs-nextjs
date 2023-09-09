import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '../loading'
import styles from './home.module.css'
import dynamic from 'next/dynamic'

function Home() {
	const { data: session, status } = useSession()
	const router = useRouter()

	if (status == 'loading') return <Loading />

	if (!session) {
		router.push('/auth/login')
	}
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
						<UsersTable accessToken={session.user?.access_token} />
					</div>
					<Link href='/auth/register'>Ir a register</Link>
				</section>
			</div>
		</main>
	)
}
export default Home
