import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import UserInfo from './UserInfo';
import EditUserInfo from './EditUserInfo';
import EditUserPassword from './EditUserPassword';
import { AppRegistrationOutlined, Edit, Info, Lock } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ShowBlogsPage from '../../pages/showBlogsPage';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			sx={{ flexDirection: { xs: 'row', md: 'column' }, width: '100%' }}
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ flexDirection: { xs: 'row', md: 'column' }, p: 3 }}>
					{children}
				</Box>
			)}
		</Box>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

function DashBoard() {
	const isMobile = useMediaQuery('(max-width: 600px)'); // Adjust the breakpoint as needed
	// const isLogin = useSelector((state) => state?.user?.isLoggedIn);
	const { isAdmin } = useSelector((state) => state?.user?.user);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				minHeight: '100vh',
			}}
		>
			<Tabs
				orientation={isMobile ? 'horizontal' : 'vertical'}
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				sx={{
					borderRight: 1,
					flexGrow: 1,
					borderColor: 'divider',
					justifyContent: 'center',
					width: { xs: '100%', sm: '156px' },
					minWidth: { xs: '100%', sm: '156px' },
					maxWidth: { xs: '100%', sm: '156px' },
					height: { xs: 'fit-content', sm: '100%' },
				}}
			>
				<Tab label="My Profile" icon={<Info />} {...a11yProps(0)} />
				<Tab label="Edit Profile" icon={<Edit />} {...a11yProps(1)} />
				<Tab label="Edit Password" icon={<Lock />} {...a11yProps(2)} />
				{isAdmin && (
					<Tab
						label="All Blogs"
						icon={<AppRegistrationOutlined />}
						{...a11yProps(3)}
					/>
				)}
			</Tabs>
			<TabPanel value={value} index={0}>
				<UserInfo setValue={setValue} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<EditUserInfo setValue={setValue} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<EditUserPassword setValue={setValue} />
			</TabPanel>

			{isAdmin && (
				<TabPanel value={value} index={3}>
					<ShowBlogsPage title="All Blogs" />
				</TabPanel>
			)}
		</Box>
	);
}

export default DashBoard;
