import React from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';
import { DateRange, Schedule } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function BlogCard_1() {
	return (
		<Box>
			<Grid container my={3}>
				<Grid item xs={12} md={6} component={Stack} flexDirection="column" gap={3}>
					<Typography gutterBottom variant="h4" component={Link} to="#">
						Self-observation is the first step of inner unfolding
					</Typography>
					<Typography variant="h6" textAlign="justify" color="text.secondary">
						Almost instantly the whole truth of the transaction seemed to rush upon
						her mind, and her wrath was inconceivably violent. She asked me a
						thousand questions in a breath; but, fortunately, was too vehement to
						attend to my embarrassment, which must otherwise have betrayed my
						knowledge of the deceit. Revenge was her first wish; and she vowed she
						would go the next morning to Justice Fielding, and inquire what
						punishment she might lawfully inflict upon the Captain for his assault.
					</Typography>
					<Box display="flex" gap={1} color="text.disabled">
						<DateRange />
						<Typography variant="body1" mr={4}>
							OCT 10, 2022
						</Typography>
						<Schedule />
						<Typography variant="body">3 min Read</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box overflow="hidden" border="15px solid black">
						<img
							alt="green iguana"
							height="100%"
							src="/images/photo-1574102289244-69b848408915.jpg"
							sx={{ transition: '0.5s', '&:hover': { transform: 'scale(1.1)' } }}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default BlogCard_1;
