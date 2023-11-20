const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
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
	}
});

module.exports = mongoose.model('Watchlist', watchlistSchema);