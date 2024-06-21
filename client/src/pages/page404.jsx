import { Box, Stack, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
	return (
		<Box
			minWidth="100%"
			minHeight="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Stack alignItems="center" gap={3}>
				<img src="/images/404-Error.png" alt="Page not found" width="80%" />
				<Typography variant="h5">Oops! Page not found ..</Typography>
				<Button variant="contained">
					<Link to="/">Back To Home</Link>
				</Button>
			</Stack>
		</Box>
	);
}

export default Page404;
