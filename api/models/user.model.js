const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'Please enter a valid firstName'],
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'please provide an Email'],
		trim: true,
		lowercase: true,
		validate(val) {
			if (!validator.isEmail(val)) {
				throw new Error('Invalid email');
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false,
		validate(val) {
			let password = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
			if (!password.test(val)) {
				throw Error(
					'Password must be min 8 characters long and contain letters uppercase and lowercase, numbers, symbols'
				);
			}
		},
	},
	age: {
		type: Number,
		default: 18,
		validate(val) {
			if (val <= 0) {
				throw new Error('Age should be positive number');
			}
		},
	},
	image: {
		type: String,
		default: '',
	},
	// role:{
	// 	type :String ,
	// 	enum:["User","Admin"],
	// 	default:"User"
	// },
	isAdmin: {
		type: Boolean,
		default: false,
	},
	tokens: [
		{
			type: String,
			expires: '2d',
			trim: true,
			select: false,
		},
	],
});

userSchema.virtual('blogs', {
	ref: 'blog',
	localField: '_id',
	foreignField: 'owner',
});

userSchema.pre('save', async function (next) {
	try {
		const user = this;
		if (!user.isModified('password')) {
			return next(); //skips the rest of this function
		}

		user.password = await bcrypt.hash(user.password, 9);
		next();
	} catch (err) {
		return next(err);
	}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
