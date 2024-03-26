const User = require('../models/user');

async function createUser(body) {
	const user = new User({
		name: body.name,
		avatar: body.avatar
	});
	const newUser = await user.save();

	return {
		userId: newUser._id
	};
}

module.exports = createUser;