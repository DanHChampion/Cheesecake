const mongoose = require('mongoose');


const continueWatchingSchema = new mongoose.Schema({
	type: {
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