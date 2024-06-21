import React, { useState } from 'react';
import {
	Box,
	InputAdornment,
	Paper,
	TextField,
	Typography,
	FormHelperText,
	Avatar,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
	AccountCircle,
	Email,
	Lock,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../config/formSchema';
import { LoadingButton } from '@mui/lab';
import { notifyError, notifySuccess } from './noastify';
import Api from '../config/api';

function RegisterForm() {
	const navigate = useNavigate();

	const [showPass, setShowPass] = useState(false);
	const [showPass2, setShowPass2] = useState(false);

	const [processing, setProcessing] = useState(false);
	// const [messages, setMessages] = useState('');

	// const handelShowPass1 = useCallback(() => {
	// 	setShowPass(!showPass);
	// }, [showPass]);

	// const handelShowPass2 = useCallback(() => {
	// 	setShowPass2(!showPass2);
	// }, [showPass2]);

	const handelShowPass1 = () => setShowPass(!showPass);
	const handelShowPass2 = () => setShowPass2(!showPass2);

	const initialInputData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordCon: '',
	};

	const submitRegister = async (values, actions) => {
		console.log('valuesssssssss ', values);
		const data = values;
		delete data.passwordCon;
		setProcessing(true);
		try {
			// api.post('/auth/signup', data){

			await Api.post('/auth/signup', data)
				.then(() => {
					setTimeout(() => {
						notifySuccess(
							'Your account created successfully'
							//, Please! Check your email to active your account
						);
						// setMessages(
						// 	'You Signed Up successfully, Please! Check your email to active your account'
						// );
						setProcessing(false);
						actions.resetForm();
						// redirect after 5sec to login page--------------------
						setTimeout(() => {
							navigate('/user/login');
						}, 3000);
					}, 1000);
				})
				.catch((error) => {
					setProcessing(false);
					const message =
						error?.response?.data?.message ||
						error?.response?.data?.error ||
						'Server connection Error, please! Try again later';
					notifyError(message);
				});
		} catch (error) {
			setProcessing(false);
			notifyError(error.message || 'Server connection Error, please! Try again later');
		}
	};

	// const handleSubmit = async (values) => {
	// 	setProcessing(true);
	// 	try {
	// 		const response = await api.post('/auth/signup', values);
	// 		notifySuccess(
	// 			'You Signed Up successfully, Please check your email to activate your account'
	// 		);
	// 		setProcessing(false);
	// 		formik.resetForm();
	// 		setTimeout(() => {
	// 			navigate('/user/login');
	// 		}, 3000);
	// 	} catch (error) {
	// 		setProcessing(false);
	// 		const errorMessage =
	// 			error?.response?.data?.message ||
	// 			error?.response?.data?.error ||
	// 			'An error occurred';
	// 		notifyError(errorMessage);
	// 	}
	// };

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: initialInputData,
		validationSchema: registerSchema,
		onSubmit: submitRegister,
	});
	console.log('values ', values);
	console.log('errors ', errors);
	console.log('touched ', touched);
	return (
		<Paper
			elevation={6}
			sx={{
				bgcolor: 'transparent',
				backdropFilter: 'blur(2px)',
				borderRadius: '20px',
				maxWidth: '520px',
			}}
		>
			<Avatar
				alt="Login"
				src="/images/user-default-avatar.jpg"
				sx={{ width: 120, height: 120, mx: 'auto', mt: '-60px' }}
			/>
			<Typography variant="h5" textAlign="center" p={2}>
				Create new Account
			</Typography>

			{/* {messages && (
				<Typography variant="body2" color="error" px={2}>
					{messages}
				</Typography>
			)} */}
			<Grid container spacing={3} component="form" p={3} onSubmit={handleSubmit}>
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
						color={touched?.firstName && (!errors.firstName ? 'success' : 'error')}
						focused
						variant="standard"
						name="firstName"
						value={values?.firstName || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors.firstName && (
						<FormHelperText id="component-error-text">
							{errors.firstName}
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
						color={touched?.lastName && (errors.lastName ? 'error' : 'success')}
						focused
						variant="standard"
						name="lastName"
						value={values?.lastName || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors.lastName && (
						<FormHelperText id="component-error-text">
							{errors.lastName}
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
						color={touched?.email && (!errors.email ? 'success' : 'error')}
						focused
						variant="standard"
						name="email"
						value={values?.email || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors.email && (
						<FormHelperText id="component-error-text">
							{errors.email}
						</FormHelperText>
					)}
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						id="register_password"
						label="Password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Lock />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									<Box sx={{ cursor: 'pointer' }} onClick={handelShowPass1}>
										{showPass ? <VisibilityOff /> : <Visibility />}
									</Box>
								</InputAdornment>
							),
						}}
						color={touched?.password && (!errors.password ? 'success' : 'error')}
						focused
						variant="standard"
						type={showPass ? 'text' : 'password'}
						name="password"
						value={values?.password || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors.password && (
						<FormHelperText id="component-error-text">
							{errors.password}
						</FormHelperText>
					)}
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						id="register_password2"
						label="Password Confirmation"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Lock />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									<Box sx={{ cursor: 'pointer' }} onClick={handelShowPass2}>
										{showPass2 ? <VisibilityOff /> : <Visibility />}
									</Box>
								</InputAdornment>
							),
						}}
						color={
							touched?.passwordCon && (!errors.passwordCon ? 'success' : 'error')
						}
						focused
						variant="standard"
						type={showPass2 ? 'text' : 'password'}
						name="passwordCon"
						value={values?.passwordCon || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors.passwordCon && (
						<FormHelperText id="component-error-text" sx={{ color: 'error' }}>
							{errors.passwordCon}
						</FormHelperText>
					)}
				</Grid>
				<LoadingButton
					type="submit"
					// endIcon={<Send />}
					loading={processing}
					loadingPosition="center"
					variant="contained"
					sx={{ mx: 'auto', mt: 3 }}
				>
					<span>Register</span>
				</LoadingButton>
				{/* <Button
					variant="contained"
					type="submit"
					sx={{ mx: 'auto', mt: 3 }}
					disabled={processing}
				>
					Register
				</Button> */}
			</Grid>
			<Typography variant="body2" p={3}>
				Already have an account?{' '}
				<Typography
					variant="body1"
					component={Link}
					to="/user/login"
					sx={{ '&:hover': { color: 'primary.main' } }}
				>
					Login here
				</Typography>
			</Typography>
		</Paper>
	);
}

export default React.memo(RegisterForm);
