import { createSlice } from '@reduxjs/toolkit'

export const Slice = createSlice({
	name: 'val',
	initialState: {
		name: 'Sergio',
	},
	reducers: {
		saveName: (state, action) => {
			state.name.action.payload
		},
	},
})

export const { saveName } = Slice.actions
