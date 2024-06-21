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
import { LoadingButton } from '@mui/lab';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import api from '../config/api';
import { notifyError, notifySuccess } from './noastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userSlice';
import { loginSchema } from '../config/formSchema';

function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showPass, setShowPass] = useState(false);
	const [processing, setProcessing] = useState(false);

	const handelShowPass1 = () => setShowPass(!showPass);

	const initialInputData = {
		email: '',
		password: '',
	};

	const submitRegister = async (values, actions) => {
		console.log(values);
		setProcessing(true);
		try {
			await api
				.post('/auth/login', values)
				.then((res) => {
					console.log(res);
					notifySuccess(res.data?.message || 'You Login successfully');

					setProcessing(false);
					// actions.resetForm();
					dispatch(login(res.data.user));
					// redirect after 2sec to login page--------------------
					setTimeout(() => {
						navigate(-1 || '/');
					}, 2000);
				})
				.catch((error) => {
					setProcessing(false);
					const message =
						error?.response?.data?.message ||
						error?.response?.data?.error ||
						'Server connection Error, please! Try again later';
					notifyError(message);
				});
				console.log('apiiiiiii', api);
		} catch (error) {
			setProcessing(false);
			notifyError(error.message || 'Server connection Error, please! Try again later');
		}
	};

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: initialInputData,
		validationSchema: loginSchema,
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
				Login to your Account
			</Typography>

			<Grid container spacing={3} component="form" p={3} onSubmit={handleSubmit}>
				<Grid xs={12}>
					<TextField
						fullWidth
						id="login_email"
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
				<Grid xs={12}>
					<TextField
						fullWidth
						id="login_password"
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

				<LoadingButton
					type="submit"
					// endIcon={<Send />}
					loading={processing}
					loadingPosition="center"
					variant="contained"
					sx={{ mx: 'auto', mt: 3 }}
				>
					<span>Login</span>
				</LoadingButton>
			</Grid>
			<Typography variant="body2" p={3}>
				Already have an account?{' '}
				<Typography
					variant="body1"
					component={Link}
					to="/user/register"
					sx={{ '&:hover': { color: 'primary.main' } }}
				>
					Register here
				</Typography>
			</Typography>
		</Paper>
	);
}

export default React.memo(LoginForm);
