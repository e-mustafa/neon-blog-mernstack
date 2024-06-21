import React from 'react';
import { blogs } from '../../config/data';
import BlogCard2 from './BlogCard_2';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function BlogCards() {
	return (
		<section>
			<Grid container spacing={3} my={3}>
				{blogs?.map((blog) => (
					<Grid key={blog.id} xs={12} sm={6} lg={4}>
						<BlogCard2 blog={blog} />
					</Grid>
				))}
			</Grid>
		</section>
	);
}

export default BlogCards;
