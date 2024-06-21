import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Collapse,
	IconButton,
	Typography,
	Stack,
	Chip,
	Box,
	AvatarGroup,
	Tooltip,
} from '@mui/material';
import { ExpandMore, DateRange, Schedule, Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { domainBack } from '../../config/api';

const ExpandMoreTag = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

function BlogCard2({ blog, dir, deleteBlog }) {
	const navigate = useNavigate();
	console.log(blog);
	const user = useSelector((state) => state?.user?.user);

	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: dir || 'column',
				height: '100%',
				position: 'relative',
			}}
		>
			{dir?.toLowerCase() !== 'row' && (
				<Box p={1} display="flex" justifyContent="space-between">
					<Box display="flex" gap={1} alignItems="center">
						<Avatar
							alt={`${blog?.owner?.firstName} ${blog?.owner?.lastName}`}
							src={domainBack + blog?.owner?.image}
						/>
						<Typography variant="body1">
							{`${blog?.owner?.firstName || ''} ${blog?.owner?.lastName || ''}`}
						</Typography>
					</Box>

					{(user?._id === blog?.owner || user?._id) === blog?.owner?._id && (
						<Box>
							<Tooltip title="edit Blog">
								<IconButton
									color="warning"
									aria-label="Edit blog"
									onClick={() => navigate(`/blogs/edit-blog/${blog?._id}`)}
								>
									<Edit />
								</IconButton>
							</Tooltip>

							<Tooltip title="Delete Blog">
								<IconButton
									color="error"
									aria-label="Delete blog"
									onClick={() => deleteBlog(blog?._id)}
								>
									<Delete />
								</IconButton>
							</Tooltip>
						</Box>
					)}
				</Box>
			)}

			<Link to={`/blogs/blog-details/${blog?._id}`}>
				<CardMedia
					component="img"
					height="100%"
					image={
						(blog?.image && domainBack + blog?.image) ||
						'/images/image-Placeholder.png'
					}
					alt={blog?.title}
				/>
			</Link>

			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				{dir?.toLowerCase() === 'row' && (
					<Box p={1} display="flex" justifyContent="space-between">
						<Box display="flex" gap={1} alignItems="center">
							<Avatar
								alt={`${user?.firstName} ${user?.lastName}`}
								src={domainBack + user?.image}
							/>
							<Typography variant="body1">
								{`${user?.firstName || ''} ${user?.lastName || ''}`}
							</Typography>
						</Box>

						{(user?._id === blog?.owner || user?._id === blog?.owner?._id) && (
							<Box>
								<Tooltip title="edit Blog">
									<IconButton
										color="warning"
										aria-label="Edit blog"
										onClick={() => navigate(`/blogs/edit-blog/${blog?._id}`)}
									>
										<Edit />
									</IconButton>
								</Tooltip>

								<Tooltip title="Delete Blog">
									<IconButton
										color="error"
										aria-label="Delete blog"
										onClick={() => deleteBlog(blog?._id)}
									>
										<Delete />
									</IconButton>
								</Tooltip>
							</Box>
						)}
					</Box>
				)}
				<Stack direction="row" gap={2} mb={2} justifyContent="space-evenly">
					{blog?.tags?.map((tag, i) => (
						<Chip key={i} label={tag} color="primary" />
					))}
				</Stack>
				<Link to={`/blogs/blog-details/${blog?._id}`}>
					<Typography variant="body2" color="text.secondary" mb={2}>
						{blog?.title}
					</Typography>
				</Link>

				<Typography variant="body2" color="text.secondary">
					{blog?.prev}
				</Typography>

				<Box
					display="flex"
					justifyContent="space-between"
					color="text.disabled"
					gap={1}
					mt={2}
				>
					<Box display="flex" gap={1}>
						<DateRange />
						<Typography variant="body2"> {blog?.date} </Typography>
					</Box>
					<Box display="flex" gap={1}>
						<Schedule />
						<Typography variant="body2">{blog?.lastRead} Read</Typography>
					</Box>
				</Box>
				<CardActions disableSpacing title={blog?.title}>
					<AvatarGroup total={blog?.readBy?.length}>
						{blog?.readBy?.map((user, i) => (
							<Avatar key={i} alt={user?.name} src={user?.avatarUrl} />
						))}
					</AvatarGroup>
					<ExpandMoreTag
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMore />
					</ExpandMoreTag>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Paragraphs:</Typography>
						{blog?.paragraphs?.map((con, i) => (
							<Typography key={i} paragraph>
								{con}
							</Typography>
						))}
					</CardContent>
				</Collapse>
			</CardContent>
		</Card>
	);
}
export default BlogCard2;
