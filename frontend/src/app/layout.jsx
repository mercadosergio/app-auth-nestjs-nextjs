import Providers from '@/redux/providers'
import './../globals.css'
import { Martel_Sans } from 'next/font/google'

const martelSans = Martel_Sans({
	subsets: ['latin'],
	weight: ['200', '300', '400', '600', '700', '800', '900'],
})

export const metadata = {
	title: 'App Users auth',
	description: '',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={martelSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
