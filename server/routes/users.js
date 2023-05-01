const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Code from: https://youtu.be/fgTGADljAeg
// Getting all
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getUser, (req, res) => {
	res.json(res.user);
});

// Creating one
router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		avatar: './default.png'
	});
	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.avatar != null) {
		res.user.avatar = req.body.avatar;
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: 'Deleted User' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: 'Cannot find user' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;

// const users = [
// {
// 	'id': 1,
// 	'name': 'Dan',
// 	'icon': ''
// },
// {
// 	'id': 2,
// 	'name': 'Panos',
// 	'icon': ''
// },
// {
// 	'id': 3,
// 	'name': 'Dai',
// 	'icon': ''
// }
// ];