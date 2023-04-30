const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(users);
});

module.exports = router;

const users = [
	{
		'id': 1,
		'name': 'Dan',
		'icon': ''
	},
	{
		'id': 2,
		'name': 'Panos',
		'icon': ''
	},
	{
		'id': 3,
		'name': 'Dai',
		'icon': ''
	}
];