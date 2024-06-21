import { Container, Typography } from '@mui/material';
import React from 'react';
import { initialBlog } from '../config/data';
import BlogForm from '../components/Blogs/BlogForm';

function AddBlogPage() {
	// get data from sessionStorage
	console.log(JSON.parse(sessionStorage.getItem('new-blog')) || initialBlog);
	return (
		<Container maxWidth="lg" sx={{ my: 7 }}>
			<Typography variant="h5" mb={3}>
				Create new Blog
			</Typography>
			<BlogForm title={'new'} />
		</Container>
	);
}

export default AddBlogPage;
