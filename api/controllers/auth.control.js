const User = require('../models/user.model');
const loggerEvent = require('../services/logger.service');
const logger = loggerEvent('auth'); // we pass file name => auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
	// register ----------------------------------
	newUser: async (req, res) => {
		try {
			const { email } = req.body;

			const DuplicatedEmail = await User.findOne({ email: email });
			if (DuplicatedEmail) {
				return res.status(403).send({ message: 'Email is already registered !' });
			}

			const newUser = new User(req.body);
			await newUser.save();
			res.status(201).send({
				// 201 new record created
				message: 'New User Created Successfully',
			});

			// write log in logs file
			logger.info('New User Created Successfully');
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	// login -----------------------------------------------------------------
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email }).select('+password +tokens');

			if (!user) {
				return res.status(401).send({ message: 'Invalid email or password' });
			}

			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) {
				return res.status(403).send({ message: 'Invalid email or password' });
			}

			//create new token
			const secretKey = process.env.SECRET_KEY;
			/* const token = jwt.sign({ id : user._id },secretKey,{ expiresIn :"7d"});*/
			const token = await jwt.sign({ id: user._id.toString() }, secretKey);

			// save token in cookies and set expire
			res.cookie('access_token', `Berear ${token}`, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * 2,
			});

			// add token to user document
			user.tokens.push(token);
			await user.save();
			console.log(user);
			
			// Remove the 'password' and 'tokens' properties from the user object
			delete user._doc.tokens;
			delete user._doc.password;
			delete user._doc.__v;

			res.status(201).send({
				user,
				message: 'Login Successfully',
			});
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	// --------------------------------------------------------------------
	// logout: async (req, res) => {
	// 	try {
	// 		logger.info(`${req.user._id} ${req.user.firstName} Logout successfully`);
	// 		res.clearCookies('access_token');
	// 		res.status(200).send({ message: 'Logout successfully' });
	// 	} catch (error) {
	// 		logger.error(error.message);
	// 		res.status(500).send({ message: error.message });
	// 	}
	// },
};

module.exports = userController;
