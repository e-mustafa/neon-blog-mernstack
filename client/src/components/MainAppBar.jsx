import { useState } from 'react';
import { AutoAwesome } from '@mui/icons-material';
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { GuestMenu, GuestPages, UserPages } from '../config/data';
import { useDispatch, useSelector } from 'react-redux';
import Api, { domainBack } from '../config/api';
import { notifyError, notifySuccess } from './noastify';
import { logout } from '../redux/reducers/userSlice';

function MainAppBar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state?.user?.isLoggedIn);
	const user = useSelector((state) => state?.user?.user);
	const pages = isLogin ? UserPages : GuestPages;
	// const UserSettings = isLogin ? UserMenu : GuestMenu;
	console.log(user);

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handelLogout = async () => {
		try {
			await Api.post(`/user/${user?._id}`).then((res) => {
				notifySuccess(res.data.message);
				console.log(res);
				dispatch(logout());
				navigate('/user/login');
			});
		} catch (error) {
			console.log('logout user err', error);
			notifyError(error?.response?.data?.message || error?.message);
		}
	};
	const handelLogoutAll = async () => {
		try {
			await Api.post(`/user/logout-all/${user?._id}`).then((res) => {
				notifySuccess(res.data.message);
				console.log(res);
				dispatch(logout());
				navigate('/user/login');
			});
		} catch (error) {
			notifyError(error?.response?.data?.message || error.message);
			console.log('logout user err', error);
		}
	};

	return (
		<AppBar
			position="static"
			enableColorOnDark
			sx={{ bgcolor: '#028fa6' }}
			component="header"
		>
			<Container maxWidth="lg">
				<Toolbar component="nav">
					<AutoAwesome sx={{ mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							// color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page, i) => (
								<MenuItem key={i} onClick={handleCloseNavMenu}>
									<Typography
										textAlign="center"
										sx={{ color: 'inherit', textDecoration: 'none' }}
										component={Link}
										to={page?.link}
									>
										{page?.title}
									</Typography>
								</MenuItem>
							))}
						</Menu>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
							sx={{ ml: 'auto' }}
						>
							<MenuIcon />
						</IconButton>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page, i) => (
							<Button
								key={i}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
								component={Link}
								to={page?.link}
							>
								{page?.title}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								{isLogin ? (
									<Avatar
										alt={`${user?.firstName} ${user?.lastName}`}
										src={domainBack + user?.image}
									/>
								) : (
									<Avatar alt="Gest" src="/images/user-default-avatar.jpg" />
								)}
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
							onClick={handleCloseUserMenu}
						>
							{isLogin && (
								<Typography
									variant="h6"
									color="primary.main"
									textAlign="center"
									px={2}
								>
									{`${user?.firstName} ${user?.lastName}`}
								</Typography>
							)}
							{!isLogin ? (
								GuestMenu?.map((setting, i) => (
									<MenuItem key={i} sx={{ display: 'block', p: 0 }}>
										<Typography
											textAlign="center"
											display="block"
											py={1}
											px={2}
											sx={{ color: 'inherit', textDecoration: 'none' }}
											component={Link}
											to={setting?.link}
										>
											{setting?.title}
										</Typography>
									</MenuItem>
								))
							) : (
								<>
									<MenuItem
										onClick={() => navigate('/user/dashboard')}
										sx={{ display: 'block', p: 0 }}
									>
										<Typography textAlign="center" py={1} px={2}>
											Dashboard
										</Typography>
									</MenuItem>

									<MenuItem
										onClick={handelLogout}
										sx={{ display: 'block', p: 0 }}
									>
										<Typography textAlign="center" py={1} px={2}>
											Logout
										</Typography>
									</MenuItem>

									<MenuItem
										onClick={handelLogoutAll}
										sx={{ display: 'block', p: 0 }}
									>
										<Typography textAlign="center" py={1} px={2}>
											Logout All
										</Typography>
									</MenuItem>
								</>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default MainAppBar;
