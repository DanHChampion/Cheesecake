const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // Might need to change name of endpoint
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(watchlist);
});

module.exports = router;

const watchlist = [
	{
		'id': 4,
		'title': 'Flapjack'
	},
	{
		'id': 5,
		'title': 'Daredevil'
	},
	{
		'id': 6,
		'title': 'The Interview'
	}
];