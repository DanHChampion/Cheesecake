const ContinueWatching = require('../models/continueWatching');

async function createContinueWatching(user, body) {
	const continueWatching = new ContinueWatching({
		userId: user._id,
		type: body.type,
		title: body.title,
		path: body.path,
		timestamp: body.timestamp,
		duration: body.duration
	});
	await continueWatching.save();
	return continueWatching;
}

module.exports = createContinueWatching;