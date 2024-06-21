import { Container } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
	return (
		<main className="register-bg">
			<Container
				maxWidth="lg"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}
			>
				<LoginForm />
			</Container>
		</main>
	);
}

export default LoginPage;
