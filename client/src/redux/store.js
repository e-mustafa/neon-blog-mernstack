import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import blogReducer from './reducers/blogSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		blog: blogReducer,
	},
});
