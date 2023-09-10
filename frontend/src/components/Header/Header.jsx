import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from './../../../public/logo-smartinfo.svg'
import styles from './header.module.css'
import { useGetProfileQuery } from '@/redux/services/authApi'
import Loading from '@/app/loading'
import { useAuth } from '@/hooks/useAuth'

function Header() {
	const { logout } = useAuth()
	const router = useRouter()

	const { data, error, isLoading, isFetching } = useGetProfileQuery(null)

	if (isLoading || isFetching) return <Loading />
	if (error) return <span> Error de itercepción de datos</span>


	const logOut = async () => {
		await logout()
		router.push('/auth/login')
	}
	return (
		<>
			<header className={styles.header}>
				<nav className={styles.navigation}>
					<Link href='/'>
						<Image src={Logo} width={100} alt='Logo smart info' />
					</Link>
					<ul className={styles.profileMenu}>
						{data && <li className={styles.item}>{data.name}</li>}
						{data && (
							<li children={styles.item}>
								<button className={styles.menuOption} onClick={logOut}>
									<svg
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
										/>
									</svg>
									Logout
								</button>
							</li>
						)}
					</ul>
				</nav>
			</header>
		</>
	)
}

export default Header
