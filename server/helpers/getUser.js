const User = require('../models/user');

async function getUser(req, res, next) {
	let user;
	if (!req.params.id) {
		return res.status(400).json({ message: 'Bad formatting' });
	}
	try {
		user = await User.findById(req.params.id);
		if (user === null) {
			return res.status(404).json({message: 'Cannot find user'});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.user = user;
	next();
}

module.exports = getUser;