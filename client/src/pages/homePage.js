import React from 'react';
import { Box, Container } from '@mui/material';
import PopularTags from '../components/PopularTags';
import BlogCard2 from '../components/Blogs/BlogCard_2';
import BlogCards from '../components/Blogs/BlogCards';
import { blogs } from '../config/data';

function homePage() {
	return (
		<Container maxWidth="lg">
			<Box component="section" my={6}>
				<BlogCard2 blog={blogs[0]} dir={'row'} />
			</Box>
			<BlogCards />
			<section>
				<PopularTags />
			</section>
		</Container>
	);
}

export default homePage;
