import { Container } from '@mui/material';
import React from 'react';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
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
				<RegisterForm />
			</Container>
		</main>
	);
}

export default RegisterPage;
