const express = require('express');
const router = express.Router();
const { readdirSync } = require('fs');

// Getting movie
router.get('/movies', async (req, res) => {
	const list = readdirSync('./videos/Movies', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let response = [];
	for (const [index, name] of list.entries()) {
		let files = readdirSync('./videos/Movies/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'id':index,
			'title': name,
			'type':'movie',
			'videopath': `${name}/${files[0]}`,
			'imagepath':'./default.png'
			// 'imagepath':'https://widowcranky.files.wordpress.com/2019/08/onceuponatimeinhollywood-banniere-800x445.jpg'
			// 'imagepath': 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/863E75A035911DBA10F8D7EE1E433A12A1BF4915670B66597AC31C585A291942/scale?width=500&aspectRatio=1.78&format=jpeg'
		});
	}
	res.json(response);
});

// Getting movie
router.get('/horror', async (req, res) => {
	const list = readdirSync('./videos/Movies', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let response = [];
	for (const [index, name] of list.entries()) {
		let files = readdirSync('./videos/Movies/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'id':index,
			'title': name,
			'type':'movie',
			'videopath': `${name}/${files[0]}`,
			'imagepath':'./default.png'
			// 'imagepath':'https://widowcranky.files.wordpress.com/2019/08/onceuponatimeinhollywood-banniere-800x445.jpg'
			// 'imagepath': 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/863E75A035911DBA10F8D7EE1E433A12A1BF4915670B66597AC31C585A291942/scale?width=500&aspectRatio=1.78&format=jpeg'
		});
	}
	res.json(response);
});

module.exports = router;