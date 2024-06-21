const mongoose = require('mongoose');
const User = require('../models/user.model');
const loggerEvent = require('../services/logger.service');
const logger = loggerEvent('auth');
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
	try {
		// be sure there is cookies before begin ------------
		if (!req.cookies) {
			return res.status(401).send({ message: 'Unauthorized User' });
		}

		// get token without (berear ) word
		const token = req?.cookies?.access_token?.split(' ')[1];

		const valid = await jwt.verify(token, process.env.SECRET_KEY);

		if (!token || !valid) {
			return res.status(401).send({ message: 'Unauthorized User' });
		}

		const { id } = req.body;
		// if (!mongoose.Types.ObjectId.isValid(id)) {
		// 	return res.status(404).send({ message: "No user found check user id" });
		// }

		const user = await User.findById(valid.id).select('+tokens');
		// if no user with this id or || if this token not includes in user tokens
		if (!user || !user.tokens.includes(token)) {
			return res.status(401).send({ message: 'Unauthorized User' });
		}

		// delete sensitive data before send user info (hide privet data)
		delete user.password;
		delete user.tokens;

		req.user = user;

		next();
	} catch (error) {
		logger.error(error.message);
		res.status(401).send({ message: error.message });
	}
};

const adminAuthorization = async (req, res, next) => {
	try {
		authentication(req, res, () => {
			//in function we write req.user = user;
			// so we run authentication fun after all checks then check if user is admin
			if (!req.user?.isAdmin) {
				res.status(403).send({ message: 'Unauthorized Admin' });
			} else {
				next();
			}
		});
	} catch (error) {
		logger.error(error.message);
		res.status(401).send({ message: error.message });
	}
};

module.exports = {
	authentication,
	adminAuthorization,
};
