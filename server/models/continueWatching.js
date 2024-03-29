const mongoose = require('mongoose');

const continueWatchingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		required:true
	},
	type: {	// 'movie' or 'series'
		type: String,
		required:true
	},
	title: {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	},
	timestamp: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('ContinueWatching', continueWatchingSchema);
