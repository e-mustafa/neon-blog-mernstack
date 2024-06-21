const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.control');
const blogUpload = require('../middleware/blog.middleware');
const auth = require('../middleware/auth.middleware');

// router.route('/admin').get(auth.adminAuthorization, blogController.getAllBlogs);
router.route('/all-blogs').get(auth.adminAuthorization, blogController.getAllBlogs);

router.use(auth.authentication);
router
	.route('/')
	.post(blogUpload.single('image'), blogController.createBlog)
	.get(blogController.getUserBlogs);

router
	.route('/:id')
	.get(blogController.getBlog)
	.patch(blogUpload.single('image'), blogController.updateBlog)
	.delete(blogController.deleteBlog);

module.exports = router;
