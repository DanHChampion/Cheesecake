const express = require('express');
const router = express.Router();
const User = require('../models/user');
const getUser = require('../helpers/getUser');
const createUser = require('../helpers/createUser');

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
		res.status(400).json({ message: err.message });
	}
});

/**
 * PATCH - Update User details from ID
 */
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

/**
 * DELETE - User from ID
 */
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.deleteOne();
		res.json({ message: 'Deleted User' });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
