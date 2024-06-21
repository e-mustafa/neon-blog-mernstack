const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.control');
const auth = require('../middleware/auth.middleware');
const avatarUpload = require('../middleware/user.middleware');

router.use(auth.authentication);

router.route('/:id').post(userCtrl.logout);
router.route('/logout-all/:id').post(userCtrl.logoutAll);
router
	.route('/profile/:id')
	.get(userCtrl.profile)
	.patch(avatarUpload.single('image'), userCtrl.editUser)
	.delete(userCtrl.deleteUser);

router.route('/change_password/:id').patch(userCtrl.changePassword);
module.exports = router;
