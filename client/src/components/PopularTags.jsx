import React from 'react';
import { ArrowForward, Style, SwitchAccessShortcut } from '@mui/icons-material';
import {
	Avatar,
	Paper,
	Stack,
	IconButton,
	Box,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { popularTags } from '../config/data';
import { Link } from 'react-router-dom';

function PopularTags() {
	return (
		<section>
			<Grid container spacing={2} my={5}>
				<Grid xs={12} md={4} lg={3}>
					<Paper elevation={4} component={Stack} p={3} textAlign="center">
						<Style sx={{ mx: 'auto' }} color="primary" />
						Popular Tags
					</Paper>
				</Grid>

				{popularTags?.map((ele, i) => (
					<Grid xs={12} md={4} lg={3} key={i}>
						<Box component={Link} sx={{ textDecoration: 'none' }}>
							<Paper
								component={Stack}
								flexDirection="row"
								alignItems="center"
								p={2}
								gap={1}
								elevation={4}
								textAlign="center"
							>
								<Avatar
									src={ele?.img || '/images/tag_9.jpg'}
									sx={{ width: '60px', height: '60px' }}
								/>
								<Stack flexGrow={1}>
									<Typography variant="h5">{ele?.title}</Typography>

									{ele?.count}
									{ele?.count > 1 ? ' posts' : ' post'}
								</Stack>

								<IconButton aria-label="More" color="primary">
									<ArrowForward />
								</IconButton>
							</Paper>
						</Box>
					</Grid>
				))}

				<Grid xs={12} md={4} lg={3}>
					<Paper component={Stack} p={3} elevation={4} textAlign="center">
						<SwitchAccessShortcut sx={{ mx: 'auto' }} color="primary" />
						View All
					</Paper>
				</Grid>
			</Grid>
		</section>
	);
}

export default PopularTags;
