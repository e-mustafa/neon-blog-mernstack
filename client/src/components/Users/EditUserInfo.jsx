import { AccountCircle, Email, InsertInvitation, Send } from '@mui/icons-material';
import {
	Avatar,
	Backdrop,
	Box,
	CircularProgress,
	FormHelperText,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { notifyError, notifySuccess } from '../noastify';
import Api, { domainBack } from '../../config/api';
import DragDropImg from '../DragDropImg';
import { useDispatch, useSelector } from 'react-redux';
import { editUserSchema } from '../../config/formSchema';
import { login } from '../../redux/reducers/userSlice';

const initialInputData = {
	firstName: '',
	lastName: '',
	email: '',
	age: '',
	img: '',
};

function EditUserInfo({ setValue }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { _id } = useSelector((state) => state?.user?.user);
	console.log(_id);

	const [user, setUser] = useState({});
	const formRef = useRef(null);

	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false)
	// const [messages, setMessages] = useState('');

	const [userImg, setUserImg] = useState(null);

	// when upload image add it to main state --------------------------
	const [img, setImg] = useState({});
	useEffect(() => {
		setUserImg(img?.preview);
		// sessionStorage.setItem('user-image', img);
		delete img?.preview;
		setValues((prev) => ({ ...prev, image: img }));
	}, [img]);
	console.log(img);



	const submitUpdate = async (values, actions) => {
		setProcessing(true);
		try {
			console.log('values ', values);

			await Api.patch(`/user/profile/${_id}`, values, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})

				.then((res) => {
					console.log(res.body?.message);
					notifySuccess(
						res.body?.message || 'Your information updated successfully'
					);

					setProcessing(false);
					actions.resetForm();

					// redirect after 2sec to login page--------------------
					setTimeout(() => {
						navigate('/user/dashboard');
						setValue(0);
					}, 2000);
				})
				.catch((error) => {
					console.log('res.error ', error);
					setProcessing(false);
					const message =
						error?.response?.data?.message ||
						error?.response?.data?.error ||
						'Server connection Error, please! Try again later';
					notifyError(message);
				});
		} catch (error) {
			console.log('error ', error);
			setProcessing(false);
			notifyError(error.message || 'Server connection Error, please! Try again later');
		}
	};

	const { values, setValues, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: initialInputData,
			validationSchema: editUserSchema,
			onSubmit: submitUpdate,
		});

	// fetch user information when load
	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			await Api.get(`/user/profile/${_id}`)
				.then((res) => {
					console.log(res?.data);
					setUser(res.data);
					dispatch(login(res.data));
				})
				.catch((error) => {
					console.log(error?.response?.data?.message);
					notifyError(error?.response?.data?.message);
				});
			setLoading(false);
		};
		getData();
	}, [_id]);


	console.log('values ', values);
	console.log('errors ', errors);
	console.log('touched ', touched);

	console.log(user);

	return (
		<Box my={5} maxWidth={500} mx="auto">
			{loading && (
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={loading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
			<Typography variant="h5" p={2}>
				{' '}
				Edit my Information{' '}
			</Typography>
			<Grid
				container
				spacing={3}
				component="form"
				p={3}
				onSubmit={handleSubmit}
				ref={formRef}
			>
				<Avatar
					alt={`${user?.firstName} ${user?.lastName}` || 'user avatar'}
					src={
						userImg ||
						(user?.image && domainBack + user?.image) ||
						'/images/user-default-avatar.jpg'
					}
					sx={{
						width: 250,
						height: 250,
						mx: 'auto',
						my: 3,
						border: (theme) => `5px solid ${theme.palette.primary.main}`,
					}}
				/>

				<Grid xs={12}>
					<Box>
						{/* <input
							type="file"
							accept="image/*"
							name="file"
							style={{ display: 'none' }}
							ref={inputFileRef}
							onChange={handleImgChange}
						/>
						<Button
							component="label"
							variant="contained"
							startIcon={<CloudUpload />}
							onClick={handelInputFile}
						>
							Upload file
						</Button> */}
						<DragDropImg setImg={setImg} />
					</Box>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						id="register_fName"
						label="First Name"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
						color={touched?.firstName && (!errors?.firstName ? 'success' : 'error')}
						focused
						variant="standard"
						name="firstName"
						value={values?.firstName}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors?.firstName && (
						<FormHelperText id="component-error-text">
							{errors?.firstName}
						</FormHelperText>
					)}
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						id="register_lName"
						label="Last Name"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
						color={touched?.lastName && (errors?.lastName ? 'error' : 'success')}
						focused
						variant="standard"
						name="lastName"
						value={values?.lastName || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors?.lastName && (
						<FormHelperText id="component-error-text">
							{errors?.lastName}
						</FormHelperText>
					)}
				</Grid>

				<Grid xs={12}>
					<TextField
						fullWidth
						id="register_email"
						label="Email"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Email />
								</InputAdornment>
							),
						}}
						color={touched?.email && (!errors?.email ? 'success' : 'error')}
						focused
						variant="standard"
						name="email"
						value={values?.email || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors?.email && (
						<FormHelperText id="component-error-text">
							{errors?.email}
						</FormHelperText>
					)}
				</Grid>
				<Grid xs={12}>
					<TextField
						fullWidth
						id="register_age"
						label="Age"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<InsertInvitation />
								</InputAdornment>
							),
						}}
						color={touched?.age && (errors?.age ? 'error' : 'success')}
						focused
						variant="standard"
						name="age"
						value={values?.age || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors?.lastName && (
						<FormHelperText id="component-error-text">{errors?.age}</FormHelperText>
					)}
				</Grid>

				<LoadingButton
					type="submit"
					// endIcon={<Send />}
					loading={processing}
					loadingPosition="center"
					variant="contained"
					endIcon={<Send />}
					sx={{ mx: 'auto', mt: 3 }}
				>
					<span>Update</span>
				</LoadingButton>
				{/* <Button
					variant="contained"
					onClick={handelReset}
					type="reset"
					sx={{ mx: 'auto', mt: 3 }}
				>
					Clear
				</Button> */}
			</Grid>
		</Box>
	);
}

export default EditUserInfo;
