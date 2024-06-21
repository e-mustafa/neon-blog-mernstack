import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import BlogCard2 from '../components/Blogs/BlogCard_2';
import Api from '../config/api';
import { notifyError } from '../components/noastify';
import { useParams } from 'react-router-dom';
import { blogs } from '../config/data';

function BlogDetailsPage() {
	const { id } = useParams();
	console.log(id);
	const [blogData, setBlogData] = useState({});
	// const [blogData, setBlogData] = useState(blogs[2]);

	// fetch blog data from server using axios and update state
	const getBlogs = async (id) => {
		try {
			const response = await Api.get(`/blogs/${id}`);
			setBlogData(response.data);
			console.log(response.data);
		} catch (error) {
			notifyError(error.message || 'Something went wrong!, Please try agin later');
			console.error(error.message);
		}
	};

	useEffect(() => {
		getBlogs(id);
	}, [id]);

	return (
		<Container maxWidth="lg" sx={{ my: 7 }}>
			<BlogCard2 blog={blogData} />
		</Container>
	);
}

export default BlogDetailsPage;
