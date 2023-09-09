'use client'

import Image from 'next/image'
import Link from 'next/link'
import AuthTemplate from '@/components/AuthTemplate/AuthTemplate'
import styles from './login.module.css'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Logo from './../../../../public/logo-smartinfo.svg'

function LoginPage() {

	const [errors, setErrors] = useState([])
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const router = useRouter()

	const handleEmail = (event) => {
		setEmail(event.target.value)
	}

	const handlePassword = (event) => {
		setPassword(event.target.value)
	}

	const login = async (e) => {
		e.preventDefault()
		setErrors([])

		const responseNextAuth = await signIn('credentials', {
			email,
			password,
			redirect: false,
		})

		if (responseNextAuth?.error) {
			setErrors(responseNextAuth.error.split(','))
			return
		}

		router.push('/home')
	}

	return (
		<AuthTemplate>
			<div className={styles.formSpace}>
				<Image
					className={styles.logo}
					src={Logo}
					width={130}
					alt='Logo smart info'
				/>
				<div className={styles.loginContainer}>
					<form className={styles.form} onSubmit={login}>
						<h1 className={styles.title}>Iniciar sesión</h1>

						<div className={styles.formField}>
							<label htmlFor='email'>Email:</label>
							<input
								onChange={handleEmail}
								placeholder='Ingrese su email'
								type='text'
								name='email'
							/>
						</div>

						<div className={styles.formField}>
							<label htmlFor='password'>Password:</label>
							<input
								onChange={handlePassword}
								placeholder='Ingrese su contraseña'
								type='password'
								name='password'
							/>
						</div>

						<button className={styles.loginButton} type='submit'>
							Sign in
						</button>
						{errors.length > 0 && (
							<div className={styles.errors}>
								<ul className=''>
									{errors.map((error, index) => (
										<li key={error}>
											{(index += 1)}. {error}
										</li>
									))}
								</ul>
							</div>
						)}
						<p>
							¿No tienes cuenta? <Link href='/auth/register'><span className={styles.registerLink}>Registrate!</span></Link>
						</p>
					</form>
				</div>
			</div>
		</AuthTemplate>
	)
}

export default LoginPage
