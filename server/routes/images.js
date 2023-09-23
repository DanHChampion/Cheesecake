const express = require('express');
const router = express.Router();
const { readdirSync } = require('fs');

// Getting avatars
router.get('/avatars', async (req, res) => {
	const list = readdirSync('./images/_avatars', { withFileTypes: true })
		.map(dirent => dirent.name);

	let response = [];
	for (const [index, name] of list.entries()) {
		response.push({
			'id': index,
			'path': name,
		});
	}
	res.json(response);
});

module.exports = router;