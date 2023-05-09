const express = require('express');
const router = express.Router();
// const User = require('../models/user');

// Getting all
router.get('/', async (req, res) => {
	try {
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', (req, res) => {
	const id = req.headers.id;
	res.json(users[users.findIndex(x => x.id === id)]);
});

// Creating one
router.post('/new', async (req, res) => {
	const newUser = {
		'id': count.toString(),
		'name': req.body.name,
		'icon': req.body.icon? req.body.icon : 'https://mir-s3-cdn-cf.behance.net/projects/max_808/22328711.54a2f9e311082.jpg'
	};

	try {
		users.push(newUser);
		res.status(201).json(newUser);
		count ++;
		console.log(users);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Code from: https://youtu.be/fgTGADljAeg
// Getting all
// router.get('/', async (req, res) => {
// 	try {
// 		const users = await User.find();
// 		res.json(users);
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 	}
// });

// // Getting One
// router.get('/:id', getUser, (req, res) => {
// 	res.json(res.user);
// });

// // Creating one
// router.post('/', async (req, res) => {
// 	try {
// 		const { newUserId } = await createUser(req.body);
// 		res.status(201).json(newUserId);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

// // Updating One
// router.patch('/:id', getUser, async (req, res) => {
// 	if (req.body.name != null) {
// 		res.user.name = req.body.name;
// 	}
// 	if (req.body.avatar != null) {
// 		res.user.avatar = req.body.avatar;
// 	}
// 	try {
// 		const updatedUser = await res.user.save();
// 		res.json(updatedUser);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

// // Deleting One
// router.delete('/:id', getUser, async (req, res) => {
// 	try {
// 		await res.user.remove();
// 		res.json({ message: 'Deleted User' });
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 	}
// });

// async function getUser(req, res, next) {
// 	let user;
// 	try {
// 		user = await User.findById(req.params.id);
// 		if (user == null) {
// 			return res.status(404).json({ message: 'Cannot find user' });
// 		}
// 	} catch (err) {
// 		return res.status(500).json({ message: err.message });
// 	}

// 	res.user = user;
// 	next();
// }

// async function createUser(body) {
// 	const user = new User({
// 		name: body.name,
// 		avatar: './default.png'
// 	});
// 	const newUser = await user.save();

// 	return {
// 		userId: newUser._id
// 	};
// }

module.exports = router;

let count = 3;

let users = [
	{
		'id': '1',
		'name': 'Dan',
		'icon': 'https://i.pinimg.com/474x/d6/e2/b9/d6e2b92c45c41819cbd4000bb447c50e.jpg'
	},
	{
		'id': '2',
		'name': 'Scott',
		'icon': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/263a1361-4930-4f55-b439-97b19a957b06/df0490e-e00e5729-8419-48a8-856c-881c66b2ff96.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI2M2ExMzYxLTQ5MzAtNGY1NS1iNDM5LTk3YjE5YTk1N2IwNlwvZGYwNDkwZS1lMDBlNTcyOS04NDE5LTQ4YTgtODU2Yy04ODFjNjZiMmZmOTYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-aogYUMgz9HQuqh5rLgH3pBd7HEcIQq2818kAoxdqJM'
	},
];