const express = require('express');
const router = express.Router();
const User = require('../models/user');
const getUser = require('../helpers/getUser');
const createUser = require('../helpers/createUser');
const updateUser = require('../helpers/updateUser');

// Code from: https://youtu.be/fgTGADljAeg

/**
 * GET - All Users
 */
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * GET - User from ID
 */
router.get('/:id', getUser, (req, res) => {
	res.json(res.user);
});

/**
 * POST - Add new User
 */
router.post('/', async (req, res) => {
	try {
		const newUserId = await createUser(req.body);
		res.status(201).json(newUserId);
	} catch (err) {
		if (err.message == 'Bad formatting') {
			return res.status(400).json({ message: err.message });
		}
		res.status(500).json({ message: err.message });
	}
});

/**
 * PATCH - Update User details from ID
 */
router.patch('/:id', getUser, async (req, res) => {
	const previousName = res.user.name;
	const previousAvatar = res.user.avatar;
	if (req.body.name == previousName && req.body.avatar == previousAvatar) {
		return res.json({ message: 'No new changes'});
	}
	const keys = Object.keys(req.body);
	if (!keys.includes('name') || !keys.includes('avatar')) {
		return res.status(400).json({ message: 'Bad formatting'});
	}
	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.avatar != null) {
		res.user.avatar = req.body.avatar;
	}
	try {
		const updatedUser = await updateUser(res.user);
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * DELETE - User from ID
 */
router.delete('/:id', getUser, async (req, res) => {
	try {
		const deleteId = res.user._id;
		const deleteName = res.user.name;
		await User.findByIdAndRemove(deleteId);
		res.json({ message: `Deleted ${deleteName}` });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
