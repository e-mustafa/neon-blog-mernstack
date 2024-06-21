import { Stack, Button } from '@mui/material';
import React from 'react';
import DashBoard from '../components/Users/DashBoard';

function DashBoardPage() {
	return (
		<section>
			<DashBoard />
			{/* <Stack mx="auto">
				<Button variant="contained" LinkComponent={Link} to="blogs/my-blogs">
					My Blogs
				</Button>
				<Button variant="contained" LinkComponent={Link} to="/blogs/create-blog">
					My Blogs
				</Button>
			</Stack> */}
		</section>
	);
}

export default DashBoardPage;
