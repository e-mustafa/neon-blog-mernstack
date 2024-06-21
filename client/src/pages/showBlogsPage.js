import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import BlogCard2 from '../components/Blogs/BlogCard_2';
import { notifyError, notifySuccess } from '../components/noastify';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Api from '../config/api';

// import { useDispatch, useSelector } from 'react-redux';
// import { getUserBlogs } from '../redux/reducers/blogSlice';
import { blogs } from '../config/data';

function ShowBlogsPage({ title }) {
	// const dispatch = useDispatch();
	// const isLogin = useSelector((state) => state?.user?.isLoggedIn);
	// const processing = useSelector((state) => state?.blogs?.processing);
	// const blogsData = useSelector((state) => state?.blogs?.data);
	// const { isAdmin, _id } = useSelector((state) => state?.user?.user);

	const [processing, setProcessing] = useState(false);
	const [blogsData, setBlogsData] = useState(blogs);

	// fetch blog data from server using axios and update state
	const getBlogs = async () => {
		setProcessing(true);
		console.log(processing);
		try {
			const response = await Api.get(
				title === 'All Blogs' ? '/blogs/all-blogs' : '/blogs'
			);
			setBlogsData(response.data);
			setProcessing(false);
			console.log(response.data?.message);
			console.log('response', response);
			console.log(processing);
		} catch (error) {
			setProcessing(false);
			console.log('error 2', error);
			notifyError(
				error?.response?.data?.message ||
					'Something went wrong!, Please try agin later'
			);
			console.error(error);
		}
	};

	const deleteBlog = async (id) => {
		try {
			await Api.delete(`/blogs/${id}`).then((res) => {
				console.log(res);
				notifySuccess(res.data?.message);
			});
		} catch (error) {
			notifyError(error.response.body.message || error.message);
			console.log('delete blog err', error);
		}
		getBlogs();
	};

	useEffect(() => {
		getBlogs();
		// dispatch(getUserBlogs());
	}, []);

	return (
		<Container maxWidth="lg" sx={{ my: 7 }} component="section">
			<Typography variant="h5" mb={3}>
				{' '}
				{title}{' '}
			</Typography>

			{processing ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '50vh',
					}}
				>
					<CircularProgress />
				</Box>
			) : blogsData?.length < 1 ? (
				<Typography variant="body1">
					There is No Blogs!. Add blog to display here
				</Typography>
			) : (
				<Grid container spacing={3} my={3}>
					{blogsData?.map((blog) => (
						<Grid key={blog?._id} xs={12} sm={6} lg={4}>
							<BlogCard2 blog={blog} deleteBlog={deleteBlog} />
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
}

export default ShowBlogsPage;
