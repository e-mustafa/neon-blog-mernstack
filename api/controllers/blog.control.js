const mongoose = require('mongoose');
const Blog = require('../models/blog.model');
const loggerEvent = require('../services/logger.service');
const logger = loggerEvent('blog');
const fs = require('fs');

const blogController = {
	createBlog: async (req, res) => {
		try {
			let date = new Date().toISOString();

			const newBlog = new Blog({ ...req.body, date, owner: req.user._id });

			if (req.file) {
				newBlog.image = `/api/blog/${req.file.filename}`;
			}

			await newBlog.save();
			res.send({ newBlog, message: 'Blog created successfully' });
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	getBlog: async (req, res) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
				return res.status(404).send({ message: 'No user found check user id' });
			}
			const blog = await Blog.findById(req.params?.id);
			if (!blog) {
				return res.status(404).send({ message: 'No Blog found' });
			}
			res.send(blog);
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	updateBlog: async (req, res) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
				return res.status(404).send({ message: 'No user found check user id' });
			}
			// if send new image update image
			if (req.file) {
				// delete old file before upload new file
				let blog = await Blog.findById(req.body._id);

				let deletePath = `./uploads/${blog?.image.split('/')[3]}`;
				fs.unlinkSync(deletePath);
				var imagePath = `/api/blog/${req.file?.filename}`;
			}
			let blog = await Blog.findByIdAndUpdate(
				req.body._id,
				{ ...req.body, image: req.file ? imagePath : req.body?.image },
				{ new: true }
			);

			res.send({ blog, message: 'Blog updated successfully' });
		} catch (error) {
			logger.error(error?.message);
			res.status(500).send({ message: error?.message });
		}
	},

	deleteBlog: async (req, res) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
				return res.status(404).send({ message: 'No user found check user id' });
			}

			const deletedBlog = await Blog.findByIdAndDelete(req.params?.id);

			if (!deletedBlog) {
				return res.status(404).send({ message: 'No Blog found' });
			}

			res.send({ deletedBlog, message: 'Blog Deleted successfully' });
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	getUserBlogs: async (req, res) => {
		try {
			const blogs = await Blog.find({ owner: req.user._id }).populate('owner');
			console.log(blogs);

			const blogsObjs = blogs.forEach((ele) => {
				delete ele._doc?.owner?.password;
				delete ele._doc?.owner?.tokens;
				delete ele._doc?.owner?.__v;
				delete ele._doc?.__v;

				delete ele.owner?.password;
				delete ele.owner?.tokens;
				delete ele.owner?.__v;
				delete ele.__v;

				return ele;
			});
			console.log(blogs);
			res.send(blogs);
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},

	getAllBlogs: async (req, res) => {
		try {
			const allBlogs = await Blog.find({}).populate('owner');

			res.send(allBlogs);
		} catch (error) {
			logger.error(error.message);
			res.status(500).send({ message: error.message });
		}
	},
};

module.exports = blogController;
