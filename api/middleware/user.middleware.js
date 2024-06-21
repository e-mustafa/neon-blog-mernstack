const multer = require('multer');
var path = require('path');

const userStorage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'uploads');
	},
	filename: function (req, file, callback) {
		const ext = path.extname(file.originalname);
		callback(null, Date.now() + ext);
	},
});

const avatarUpload = multer({
	storage: userStorage,
	limits: { fileSize: 1024 * 1024 * 5 },
	fileFilter: function (req, file, callback) {
		if (
			file.mimetype == 'image/png' ||
			file.mimetype == 'image/jpg' ||
			file.mimetype == 'image/jpeg'
		) {
			callback(null, true);
		} else {
			callback(res.status(400).send({message:'only jpg, png are allowed'}), false);
		}
	},
});

module.exports = avatarUpload;
