const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		require: true,
	},
	prev: {
		type: String,
		trim: true,
		require: true,
	},
	paragraphs: [
		{
			type: String,
		},
	],
	tags: [
		{
			type: String,
			trim: true,
			lowercase: true,
		},
	],
	image: {
		type: String,
		trim: true,
		default: '',
	},
	date: {
		type: Date,
		// default: Date.now().toString(),
		require: true,
	},
	comments: [],
	owner: {
		type: mongoose.Types.ObjectId,
		require: true,
		ref: 'User',
	},
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
