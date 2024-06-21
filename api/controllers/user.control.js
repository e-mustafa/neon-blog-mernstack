const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/user.model');
const loggerEvent = require('../services/logger.service');
const jwt = require('jsonwebtoken');
const logger = loggerEvent('auth');
const bcrypt = require('bcryptjs');

const userController = {
	profile: async (req, res) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
				return res.status(404).send({ message: 'No user found check user id' });
			}

			const user = await User.findById(req.params.id);
			if (!user) {
				return res.status(404).send({ message: 'No user found check user id' });
			}

			delete user._doc.tokens;
			delete user._doc.password;
			delete user._doc.__v;

			res.status(200).send(user);
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},
	editUser: async (req, res) => {
		try {
			console.log(req.params?.id);
			console.log(req.body);
			if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
				return res.status(404).send({ message: 'No user found check user id' });
			}

			// if send new image update image
			console.log('req.file', req.body);
			if (req.file) {
				// delete old file before upload new file
				let user = await User.findById(req.body._id);
				console.log(user);

				let deletePath = `./uploads/${user?.image.split('/')[3]}`;
				user?.image && fs.unlinkSync(deletePath);
				var imagePath = `/api/user/${req.file?.filename}`;
			}

			const user = await User.findByIdAndUpdate(
				req.body._id,
				{ ...req.body, image: req.file ? imagePath : req?.body?.image },
				{ new: true }
			);

			if (!user) {
				return res.status(404).send({ message: 'No user found check user id2' });
			}

			delete user?._doc?.tokens;
			delete user?._doc?.password;
			delete user?._doc?.__v;

			delete user?.tokens;
			delete user?.password;
			delete user?.__v;

			res.status(200).send({ user, message: 'User information updated successfully' });
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	changePassword: async (req, res) => {
		try {
			console.log(req.params?.id);
			console.log(req.body);
			if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
				return res.status(404).send({ message: 'No user found check user id' });
			}

			const user = await User.findById(req.params?.id).select('+password');
			console.log(user);
			if (!user) {
				return res.status(404).send({ message: 'No user found check user id2' });
			}
			console.log(user?.password);

			const validPassword = await bcrypt.compare(
				req.body?.oldPassword,
				user?.password
			);
			if (!validPassword) {
				return res.status(403).send({ message: 'Invalid old password' });
			}

			// const samePassword = await bcrypt.compare(req.body?.Password, user?.password);
			// if (samePassword) {
			// 	return res
			// 		.status(403)
			// 		.send({ message: 'Passwords are same write a new password' });
			// }

			user.password = req.body?.password;
			await user.save();

			delete user?._doc?.__v;

			res.status(200).send({ user, message: 'User password updated successfully' });
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	logout: async (req, res) => {
		try {
			const user = await User.findById(req.user?._id).select('+tokens');
			if (!user) {
				return res.status(404).send({ message: 'No user found' });
			}
			user.tokens = user.tokens.filter((t) => t != req.token);
			res.clearCookie('access_token');
			console.log(user);
			await user.save();
			res.status(200).send({ message: 'User logout successfully' });

			logger.info(`${req.user?._id} ${req.user?.firstName} Logout successfully`);
			// socketio.emit('updateUserList', usersInRoom());
		} catch (error) {
			console.log(error);
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	logoutAll: async (req, res) => {
		try {
			const user = await User.findById(req.user._id).select('+tokens');
			user.tokens = [];
			res.clearCookie('access_token');
			await user.save();
			res.status(200).send({ message: 'User logout from all devices successfully' });

			logger.info(`${req.user.id} User logout from all devices successfully`);
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	deleteUser: async (req, res) => {
		try {
			console.log(req.params?.id);
			if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
				return res.status(404).send({ message: 'User not found1' });
			}

			const user = await User.findByIdAndDelete(req.user?._id);
			if (!user) {
				return res.status(404).send({ message: 'User not found2' });
			}
			res.clearCookie('access_token');
			res.send({ message: 'Account deleted successfully' });
			logger.info(`id: ${req.params.id} Account deleted successfully`);
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},
};

module.exports = userController;
