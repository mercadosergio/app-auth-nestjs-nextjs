import Providers from '@/redux/providers'
import './../globals.css'
import { Martel_Sans } from 'next/font/google'
import SessionAuthProvider from '@/context/SessionAuthProvider'

const martelSans = Martel_Sans({
	subsets: ['latin'],
	weight: ['200', '300', '400', '600', '700', '800', '900']
})

export const metadata = {
	title: 'Next.js',
	description: ''
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={martelSans.className}>
				<Providers>
					<SessionAuthProvider>
						{children}
					</SessionAuthProvider>
				</Providers>
			</body>
		</html>
	)
}
