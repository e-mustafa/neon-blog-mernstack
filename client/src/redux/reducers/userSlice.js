import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: false,
	user: {},
};
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			console.log(state.isLoggedIn);
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = {};
			console.log(state.isLoggedIn);
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
