const Joi = require("joi");

const newUserSchema = Joi.object({
	firstName: Joi.string().min(3).required(),
	lastName: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(
		new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')
	),
	repeat_password: Joi.ref('password'),
	img:Joi.string(),
	age: Joi.number(),
	isAdmin: Joi.boolean(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password:Joi.string().min(3).required()

})

module.exports = { newUserSchema, loginSchema };
