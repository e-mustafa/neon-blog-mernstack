const multer = require("multer");
var path = require("path");

const bloStorage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "uploads");
	},
	filename: function (req, file, callback) {
		const ext = path.extname(file.originalname);
		callback(null, Date.now() + ext);
	},
});

const blogUpload = multer({
	storage: bloStorage,
	limits: { fileSize: 1024 * 1024 * 5 },
	fileFilter: function (req, file, callback) {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			callback(null, true);
		} else {
			callback(null.false);
		}
	},
});

module.exports = blogUpload;
