import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import {
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
	TextField,
	Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { ExpandMore, Delete, AddCircleOutline, Send } from '@mui/icons-material';

import DragDropImg from '../DragDropImg';
import { notifyError, notifySuccess } from '../noastify';
import { LoadingButton } from '@mui/lab';
import Api, { domainBack } from '../../config/api';
import { useNavigate, useParams } from 'react-router-dom';
import { initialBlog } from '../../config/data';

// expand part -----------------------------------------
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

function BlogForm({ title }) {
	const navigate = useNavigate();
	const { id } = useParams();

	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => setExpanded(!expanded);

	const [formInfo, setFormInfo] = useState(
		title.toLowerCase() === 'new' ? initialBlog : {}
	);

	const [processing, setProcessing] = useState(false);

	const handelChange = (event) => {
		const { name, value } = event.target;
		setFormInfo({ ...formInfo, [name]: value });
	};

	const handelChip = () => {};

	// when upload image add it to main state --------------------------
	const [img, setImg] = useState('');
	useEffect(() => {
		if (img) { setFormInfo((prev) => ({ ...prev, image: img })) }
	}, [img]);
	console.log(img);

	//  handel Change in array form -----------------------------------------------
	function handelChangeSkills(e, i, type) {
		const { value } = e.target;
		const values = [...formInfo?.[type]];
		values[i] = value;
		setFormInfo((prev) => ({
			...prev,
			[type]: values,
		}));
	}

	function deleteSkill(i, type) {
		// let newArray = formInfo?.skills?.filter((_, index) => index !== i);
		formInfo?.[type].splice(i, 1);
		setFormInfo((prev) => ({ ...prev, [type]: [...formInfo?.[type]] }));
	}

	function addSkillInput(type) {
		setFormInfo((prev) => ({
			...prev,
			[type]: [...prev?.[type], ''],
		}));
	}

	useEffect(() => {
		sessionStorage.setItem('new-blog', JSON.stringify(formInfo));
	}, [formInfo]);

	const getBlogs = async (id) => {
		try {
			const response = await Api.get(`/blogs/${id}`);
			setFormInfo(response.data);
			console.log(response.data);
		} catch (error) {
			notifyError(error.message || 'Something went wrong!, Please try agin later');
			console.error(error.message);
		}
	};

	useEffect(() => {
		title && title.toLowerCase() !== 'new' && getBlogs(id);
	}, [id]);

	const HandelSubmit = async (event) => {
		event.preventDefault();
		setProcessing(true);

		
		try {
			if (!formInfo?.title || !formInfo?.prev) {
				setProcessing(false);
				return notifyError(
					'Empty blog fields not accepted !, Write a title and a prev'
				);
			}
			const config = {
				headers: { 'Content-Type': 'multipart/form-data' },
			};

			let response = {};
			if (title.toLowerCase() === 'new') {
				response = await Api.post('/blogs', formInfo, config);
			} else {
				response = await Api.patch(`/blogs/${id}`, formInfo, config);
			}

			console.log(response);

			notifySuccess(response?.message || 'Blog published successfully');
			setProcessing(false);
			event.target.reset();
			sessionStorage.removeItem('new-blog');
			// redirect after 2sec --------------------
			setTimeout(() => {
				navigate('/dashboard/my-blogs');
			}, 2000);
		} catch (error) {
			setProcessing(false);
			console.log(error);
			notifyError(
				error?.response?.body?.message ||
					error?.message ||
					'Server connection Error, please! Try again later'
			);
		}
	};

	return (
		<Card component="form" onSubmit={HandelSubmit}>
			<CardMedia
				component="img"
				height="100%"
				image={
					img?.preview ||
					(formInfo?.image && domainBack + formInfo?.image) ||
					'/images/image-Placeholder.png'
				}
				alt="Uploaded Image"
				sx={{ mb: 3 }}
			/>

			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					gap: 3,
				}}
			>
				<Stack
					flexGrow={1}
					direction="row"
					gap={2}
					my={2}
					justifyContent="space-evenly"
					flexWrap="wrap"
				>
					{formInfo?.tags?.map((tag, i) => (
						<Chip key={i} label={tag} color="primary" onClick={handelChip} />
					))}
				</Stack>
				<Grid container spacing={3}>
					<Grid xs={12} sm={8}>
						<Stack>
							<Typography variant="h6">Add Tags:</Typography>
							{formInfo?.tags?.map((prf, i) => (
								<Box mb={3} display="flex" key={i}>
									<TextField
										sx={{ flexGrow: 1 }}
										id="standard-required"
										label="Tag"
										variant="standard"
										name="title"
										value={prf || ''}
										onChange={(e) => handelChangeSkills(e, i, 'tags')}
									/>

									<Tooltip title="Remove item">
										<IconButton
											aria-label="Remove"
											sx={{ width: '45px', height: '45px' }}
											onClick={() => deleteSkill(i, 'tags')}
										>
											<Delete />
										</IconButton>
									</Tooltip>
								</Box>
							))}

							<Tooltip title="Add item">
								<IconButton
									aria-label="Add"
									sx={{ width: '45px', height: '45px', marginLeft: 'auto' }}
									onClick={() => addSkillInput('tags')}
								>
									<AddCircleOutline />
								</IconButton>
							</Tooltip>
						</Stack>
					</Grid>

					<Grid xs={12} sm={4}>
						<Typography variant="h6" mb={2}>
							Add Image:
						</Typography>
						<DragDropImg setImg={setImg} />
					</Grid>
				</Grid>

				<TextField
					id="standard-required"
					label="Title"
					variant="standard"
					name="title"
					value={formInfo?.title}
					onChange={(e) => handelChange(e)}
				/>

				<TextField
					id="standard-required"
					label="Prev"
					variant="standard"
					multiline
					minRows={3}
					name="prev"
					value={formInfo?.prev}
					onChange={(e) => handelChange(e)}
				/>

				<CardActions disableSpacing title={formInfo?.title}>
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
						<Typography paragraph>paragraphs:</Typography>
						{formInfo?.content?.map((con, i) => (
							<Typography key={i} paragraph>
								{con}
							</Typography>
						))}

						<Stack gap={2}>
							{formInfo?.paragraphs?.map((prf, i) => (
								<Box key={i} display="flex" mb={3}>
									<TextField
										sx={{ flexGrow: 1 }}
										id="standard-required"
										label="Paragraph"
										variant="standard"
										name="title"
										value={prf || ''}
										multiline
										minRows={3}
										onChange={(e) => handelChangeSkills(e, i, 'paragraphs')}
									/>

									<Tooltip title="Remove item">
										<IconButton
											aria-label="Remove"
											sx={{ minWidth: '45px' }}
											onClick={() => deleteSkill(i, 'paragraphs')}
										>
											<Delete />
										</IconButton>
									</Tooltip>
								</Box>
							))}

							<Tooltip title="Add item">
								<IconButton
									aria-label="Add"
									sx={{ width: '45px', height: '45px', marginLeft: 'auto' }}
									onClick={() => addSkillInput('paragraphs')}
								>
									<AddCircleOutline />
								</IconButton>
							</Tooltip>
						</Stack>
					</CardContent>
				</Collapse>

				<LoadingButton
					type="submit"
					endIcon={<Send />}
					loading={processing}
					loadingPosition="center"
					variant="contained"
					sx={{ mx: 'auto', mt: 3 }}
				>
					<span>Publish</span>
				</LoadingButton>
			</CardContent>
		</Card>
	);
}
export default BlogForm;
