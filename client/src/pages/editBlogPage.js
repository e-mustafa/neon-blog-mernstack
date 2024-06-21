import { Container, Typography } from '@mui/material';
import React from 'react';
import BlogForm from '../components/Blogs/BlogForm';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { initialBlog } from '../config/data';

function EditBlogPage() {
	
	return (
		<Container maxWidth="lg" sx={{ my: 7 }}>
			<Typography variant="h5" mb={3}>
				Edit Blog
			</Typography>
			<BlogForm title={'Edit'} />
		</Container>
	);
}

export default EditBlogPage;
