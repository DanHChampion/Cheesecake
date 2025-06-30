const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	theme: {
		type: String,
		default: 'default'
	},
	language: {
		type: String,
		default: 'English'
	},
});

module.exports = mongoose.model('User', userSchema);