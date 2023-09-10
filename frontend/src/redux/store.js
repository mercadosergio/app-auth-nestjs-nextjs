import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './features/profileSlice'
import { authApi } from './services/authApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export default configureStore({
	reducer: {
		profile: profileSlice,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([authApi.middleware]),
})
