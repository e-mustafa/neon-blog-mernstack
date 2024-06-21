const { newUserSchema, loginSchema } = require("../services/userValidation");

// register validate document for Joi schema before save in database
function newUserValidation(req, res, next) {
	try {
		const { error } = newUserSchema.validate(req.body);
		if (error) {
			return res.status(403).send({ message: error.details[0].message });
		}
		next();

		// return res.send();
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}


// login validate document for Joi schema before save in database
function loginValidation(req, res, next) {
	try {
		const { error } = loginSchema.validate(req.body);
		if (error) {
			return res.status(403).send({ message: error.details[0].message });
		}
		next();
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

module.exports = { newUserValidation, loginValidation };
