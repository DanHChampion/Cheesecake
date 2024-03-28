async function updateUser(user) {
	user.save();
}

module.exports = updateUser;