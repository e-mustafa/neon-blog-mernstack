import * as yup from 'yup';
export const registerSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(3, 'must be at least 3 characters')
		.max(30, 'must be at least 30 characters or less')
		.required('This filed is Required'),
	lastName: yup
		.string()
		.min(3, 'must be at least 3 characters')
		.max(30, 'must be at least 30 characters or less')
		.required('This  filed is Required'),
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Email filed is Required'),
	password: yup
		.string()
		.min(5, 'Password must be at least 5 characters')
		.required('This filed is Required'),
	//  .matches(passwordRules, { message: "Please create a stronger password" })
	passwordCon: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('This filed is Required'),
});

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Email filed is Required'),
	password: yup
		.string()
		.min(5, 'Password must be at least 5 characters')
		.required('This filed is Required'),
});

export const editUserSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(3, 'must be at least 3 characters')
		.max(30, 'must be at least 30 characters or less')
		.required('This filed is Required'),
	lastName: yup
		.string()
		.min(3, 'must be at least 3 characters')
		.max(30, 'must be at least 30 characters or less')
		.required('This  filed is Required'),
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Email filed is Required'),
	age: yup.number().positive('Age must be positive value'),
});

export const changePassSchema = yup.object().shape({
	oldPassword: yup
		.string()
		.min(5, 'Password must be at least 5 characters')
		.required('This filed is Required'),
	//  .matches(passwordRules, { message: "Please create a stronger password" })
	password: yup
		.string()
		.min(5, 'Password must be at least 5 characters')
		.required('This filed is Required'),
	//  .matches(passwordRules, { message: "Please create a stronger password" })

	passwordCon: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('This filed is Required'),
});
