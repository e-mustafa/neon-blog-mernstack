import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../config/api';
import { notifyError } from '../../components/noastify';

const initialState = {
	processing: false,
	data: [],
	allData: [],
	error: null,
};

export const getAllBlogs = createAsyncThunk('admin/getAllBlog', async (_, thunkApi) => {
	try {
		const res = await Api.get('/blogs/all-blogs');
		console.log(res.data);
		return res.data;
	} catch (error) {
		let EMessage = error?.res?.data?.message || error?.res?.data?.error;
		notifyError(EMessage);
		return thunkApi.rejectWithValue(EMessage);
	}
});

export const getUserBlogs = createAsyncThunk('admin/getAllBlog', async (_, thunkApi) => {
	try {
		const res = await Api.get('/blogs');
		console.log(res.data);
		return res.data;
	} catch (error) {
		let EMessage = error?.res?.data?.message || error?.res?.data?.error;
		notifyError(EMessage);
		return thunkApi.rejectWithValue(EMessage);
	}
});

export const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {},
	extraReducers: {
		// admin blogs
		[getAllBlogs.pending]: (state, action) => {
			state.processing = true;
		},
		[getAllBlogs.fulfilled]: (state, action) => {
			state.processing = false;
			state.allData = action.payload;
		},
		[getAllBlogs.pending]: (state, action) => {
			state.processing = false;
			state.error = 'error';
		},

		// user blogs
		[getUserBlogs.pending]: (state, action) => {
			state.processing = true;
		},
		[getUserBlogs.fulfilled]: (state, action) => {
			state.processing = false;
			state.data = action.payload;
		},
		[getUserBlogs.pending]: (state, action) => {
			state.processing = false;
			state.error = 'error';
		},
	},
});

export const { login, logout } = blogSlice.actions;

export default blogSlice.reducer;
