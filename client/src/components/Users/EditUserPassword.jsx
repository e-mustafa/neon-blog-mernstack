import { Lock, Send, Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Avatar,
	Box,
	FormHelperText,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { notifyError, notifySuccess } from '../noastify';
import Api, { domainBack } from '../../config/api';
import { useSelector } from 'react-redux';
import { changePassSchema } from '../../config/formSchema';

function EditUserPassword({ setValue }) {
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state?.user?.user);
	const user = useSelector((state) => state?.user?.user);

	const [showPass0, setShowPass0] = useState(false);
	const [showPass1, setShowPass1] = useState(false);
	const [showPass2, setShowPass2] = useState(false);

	const [processing, setProcessing] = useState(false);

	const handelShowPass0 = () => setShowPass0(!showPass0);
	const handelShowPass1 = () => setShowPass1(!showPass1);
	const handelShowPass2 = () => setShowPass2(!showPass2);

	const initialInputData = {
		oldPassword: '',
		password: '',
		passwordCon: '',
	};

	const submitRegister = async (values, actions) => {
		if (values.oldPassword === values.password) {
			return notifyError('Passwords are same write a new password');
		}
		console.log('valuesssssssss ', values);
		const data = values;
		delete data.passwordCon;
		console.log('Data ', data);

		setProcessing(true);
		try {
			console.log(`/user/change-password/${_id}`);
			await Api.patch(`/user/change_password/${_id}`, data).then((res) => {
				console.log(res);
				notifySuccess(res.data?.message || 'Your Password successfully');

				setProcessing(false);
				actions.resetForm();

				// redirect after 2sec to login page--------------------
				setTimeout(() => {
					navigate('/user/login');
					setValue(0);
				}, 2000);
			});
		} catch (error) {
			console.log('error catch ', error);
			setProcessing(false);
			const message =
				error?.response?.data?.message ||
				error?.response?.data?.error ||
				'Server connection Error, please! Try again later';
			notifyError(message);
		}
	};

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: initialInputData,
		validationSchema: changePassSchema,
		onSubmit: submitRegister,
	});
	console.log('values ', values);
	console.log('errors ', errors);
	console.log('touched ', touched);

	return (
		<Box my={5} maxWidth={500} mx="auto">
			<Typography variant="h5" p={2}>
				Update Password
			</Typography>
			<Avatar
				alt={`${user?.firstName} ${user?.lastName}` || 'user avatar'}
				src={
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

			<Grid container spacing={3} component="form" p={3} onSubmit={handleSubmit}>
				<Grid xs={12}>
					<TextField
						fullWidth
						id="old_password"
						label="Old Password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Lock />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									<Box sx={{ cursor: 'pointer' }} onClick={handelShowPass0}>
										{showPass0 ? <VisibilityOff /> : <Visibility />}
									</Box>
								</InputAdornment>
							),
						}}
						color={
							touched?.oldPassword && (!errors?.oldPassword ? 'success' : 'error')
						}
						focused
						variant="standard"
						type={showPass0 ? 'text' : 'password'}
						name="oldPassword"
						value={values?.oldPassword || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors.oldPassword && (
						<FormHelperText id="component-error-text">
							{errors?.oldPassword}
						</FormHelperText>
					)}
				</Grid>
				<Grid xs={12}>
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
										{showPass1 ? <VisibilityOff /> : <Visibility />}
									</Box>
								</InputAdornment>
							),
						}}
						color={touched?.password && (!errors?.password ? 'success' : 'error')}
						focused
						variant="standard"
						type={showPass1 ? 'text' : 'password'}
						name="password"
						value={values?.password || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors?.password && (
						<FormHelperText id="component-error-text">
							{errors?.password}
						</FormHelperText>
					)}
				</Grid>
				<Grid xs={12}>
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
							touched?.passwordCon && (!errors?.passwordCon ? 'success' : 'error')
						}
						focused
						variant="standard"
						type={showPass2 ? 'text' : 'password'}
						name="passwordCon"
						value={values?.passwordCon || ''}
						onChange={handleChange}
						onInput={handleBlur}
					/>
					{errors?.passwordCon && (
						<FormHelperText id="component-error-text" sx={{ color: 'error' }}>
							{errors?.passwordCon}
						</FormHelperText>
					)}
				</Grid>
				<LoadingButton
					type="submit"
					endIcon={<Send />}
					loading={processing}
					loadingPosition="center"
					variant="contained"
					sx={{ mx: 'auto', mt: 3 }}
				>
					<span>Update</span>
				</LoadingButton>
			</Grid>
		</Box>
	);
}

export default EditUserPassword;
