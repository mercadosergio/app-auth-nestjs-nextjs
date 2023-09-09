import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProfile } from '@/redux/features/profileSlice'
import axios from 'axios'
import { API_URL } from '@/config/environment'
import Logo from './../../../public/logo-smartinfo.svg'
import styles from './header.module.css'

function Header() {
	const profile = useSelector((state) => state.profile)
	const { data: session, status } = useSession()
	const router = useRouter()
	const dispatch = useDispatch()

	if (!session) {
		router.push('/auth/login')
	}

	if (status === 'authenticated') {
		const profileResponse = axios.get(`${API_URL}/auth/profile`, {
			headers: {
				Authorization: `Bearer ${session.user?.access_token}`,
			},
		})
		const data = profileResponse.data
		dispatch(setProfile(data))
	}

	return (
		<>
			<header className={styles.header}>
				<nav className={styles.navigation}>
					<Link href='/'>
						<Image src={Logo} width={100} alt='Logo smart info' />
					</Link>
					<ul className={styles.profileMenu}>
						<li children={styles.item}>
							{status == 'authenticated' && (
								<button
									className={styles.menuOption}
									onClick={() => {
										signOut()
										router.push('/auth/login')
									}}
								>
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
							)}
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}

export default Header
