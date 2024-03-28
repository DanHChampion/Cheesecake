const Watchlist = require('../models/watchlist');

async function createWatchlist(user, body) {
	const watchlist = new Watchlist({
		userId: user._id,
		type: body.type,
		title: body.title,
		path: body.path
	});
	await watchlist.save();
	return watchlist;
}

module.exports = createWatchlist;