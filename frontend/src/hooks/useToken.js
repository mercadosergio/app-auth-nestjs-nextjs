import Cookies from 'js-cookie'

function useToken(tokenName, sessionName) {
	const setSession = (accessToken) => {
		Cookies.set(tokenName, accessToken)
		Cookies.set(sessionName, true)
	}

	const getSession = () => {
		const accessToken = Cookies.get(tokenName)
		const session = Cookies.get(sessionName)
		if (!accessToken && !session) return false

		return {
			accessToken,
			session,
		}
	}

	const existsSessionToken = () => {
		getSession()
		return true
	}

	const destroySession = () => {
		Cookies.remove(tokenName)
		Cookies.remove(sessionName)
	}

	return { setSession, getSession, destroySession, existsSessionToken }
}
export { useToken }
