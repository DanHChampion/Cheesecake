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
	continueWatching: [{
		type: mongoose.ObjectId,
		ref: 'ContinueWatching'
	}]
});

module.exports = mongoose.model('User', userSchema);