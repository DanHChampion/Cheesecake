const express = require('express');
const router = express.Router();
const User = require('../models/user');

// // Getting all
// router.get('/', async (req, res) => {
// 	try {
// 		res.json(users);
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 	}
// });

// // Getting One
// router.get('/:id', (req, res) => {
// 	const id = req.params.id;
// 	res.json(users[users.findIndex(x => x.id === id)]);
// });

// // Creating one
// router.post('/', async (req, res) => {
// 	const newUser = {
// 		'id': count.toString(),
// 		'name': req.body.name,
// 		'icon': req.body.icon? req.body.icon : 'avatar0.jpg'
// 	};

// 	try {
// 		users.push(newUser);
// 		res.status(201).json(newUser);
// 		count ++;
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

// // Updating One
// router.patch('/:id', async (req, res) => {
// 	const id = req.params.id;
// 	const index = users.findIndex(x => x.id === id);
// 	if (req.body.name !== null){
// 		users[index].name = req.body.name;
// 	}
// 	if (req.body.icon !== null){
// 		users[index].icon = req.body.icon;
// 	}

// 	try {
// 		const updatedUser = users[index];
// 		res.json(updatedUser);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

// // Deleting One
// router.delete('/:id', async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const index = users.findIndex(x => x.id === id);
// 		const x = users.splice(index, 1);
// 		console.log(x);
// 		res.json({ message: 'Deleted User' });
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({ message: err.message });
// 	}
// });

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
	try {
		const { newUserId } = await createUser(req.body);
		res.status(201).json(newUserId);
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
		await res.user.deleteOne();
		res.json({ message: 'Deleted User' });
	} catch (err) {
		console.log(err.message);
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

module.exports = router;

// let count = 3;

// let users = [
// 	{
// 		'id': '1',
// 		'name': 'Dan',
// 		'icon': 'Batman.jpg'
// 	},
// 	{
// 		'id': '2',
// 		'name': 'Scott',
// 		'icon': 'Scott.jpg'
// 	},
// ];
