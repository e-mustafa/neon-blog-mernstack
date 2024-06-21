import { DeleteForever, Edit, LockReset } from '@mui/icons-material';
import {
	Avatar,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Stack,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';

import { notifyError, notifyInfo } from '../noastify';
import Api, { domainBack } from '../../config/api';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { login, logout } from '../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

function UserInfo({ setValue }) {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { _id } = useSelector((state) => state?.user?.user);
	const [deleting, setDeleting] = useState(false);
	const [loading, setLoading] = useState(false);
	console.log(_id);
	const [user, setUser] = useState({});

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

	const deleteAccount = async () => {
		setDeleting(true);
		try {
			await Api.delete(`user/profile/${_id}`).then((res) => {
				notifyInfo(res.data?.message);
				console.log(res.data);
			});
			setDeleting(false);
			navigate('/user/login');
			dispatch(logout());
		} catch (error) {
			notifyError(error.response?.data?.message || error.message);
			console.log('delete blog err', error);
			setDeleting(false);
		}
	};

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
				Your Information
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

			<Grid container spacing={3} p={3} textAlign="center">
				<Grid xs={12} md={6}>
					First Name:
					<Typography variant="h5" color="primary.main">
						{user?.firstName}
					</Typography>
				</Grid>
				<Grid xs={12} md={6}>
					Last Name:
					<Typography variant="h5" color="primary.main">
						{user?.lastName}
					</Typography>
				</Grid>
				<Grid xs={12}>
					Email:
					<Typography variant="h5" color="primary.main">
						{user?.email}
					</Typography>
				</Grid>
				<Grid xs={12}>
					Age:
					<Typography variant="h5" color="primary.main">
						{user?.age} years old
					</Typography>
				</Grid>
				<Grid xs={12} component={Stack} alignItems="center" gap={2} mx="auto">
					<Button
						variant="contained"
						type="submit"
						sx={{ mx: 'auto', mt: 3 }}
						endIcon={<Edit />}
						onClick={() => setValue(1)}
					>
						Edit my Information
					</Button>

					<Button
						variant="contained"
						endIcon={<LockReset />}
						onClick={() => setValue(2)}
					>
						Edit Password
					</Button>

					<LoadingButton
						type="submit"
						endIcon={<DeleteForever />}
						loading={deleting}
						loadingPosition="center"
						variant="contained"
						sx={{ mx: 'auto', mt: 2 }}
						onClick={deleteAccount}
					>
						<span>Delete Account</span>
					</LoadingButton>
				</Grid>
			</Grid>
		</Box>
	);
}

export default UserInfo;
