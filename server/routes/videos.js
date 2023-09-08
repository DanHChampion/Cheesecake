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
		});
	}
	res.json(response);
});

// Getting series
router.get('/series', async (req, res) => {
	const list = readdirSync('./videos/Series', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let response = [];
	for (const [index, name] of list.entries()) {
		let files = readdirSync('./videos/Series/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'id':index,
			'title': name,
			'type':'series',
			'videopath': `${name}/${files[0]}`,
		});
	}
	res.json(response);
});

// Getting series seasons folders
router.get('/series/seasons/:title', async (req, res) => {
	try {
		res.json(readdirSync('./videos/Series/'+req.params.title, { withFileTypes: true })
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name));
	} catch {
		res.status(400);
	}
});

// Getting all episdoes within a season
router.get('/series/:title/:season', async (req, res) => {
	try {
		const season = req.params.season;
		const title = req.params.title;
		const list = readdirSync('./videos/Series/'+title+'/'+season, { withFileTypes: true })
			.map(dirent => dirent.name);

		let response = [];
		for (const [index, name] of list.entries()) {
			const epTitle = name.replace(/\.[^/.]+$/, '');
			response.push({
				'episode': index+1,
				'title': epTitle,
				'videopath': title+'/'+season+'/'+name,
			});
		}
		res.json(response);
	}
	catch{
		res.status(400);
	}

});

// Getting all videos
router.get('/all', async (req, res) => {
	const moviesList = readdirSync('./videos/Movies', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let response = [];
	let index = 0;
	moviesList.forEach(name => {
		let files = readdirSync('./videos/Movies/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'id':index,
			'title': name,
			'type':'movie',
			'videopath': `${name}/${files[0]}`,
		});
		index ++;
	});
	const seriesList = readdirSync('./videos/Series', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	seriesList.forEach(name => {
		let files = readdirSync('./videos/Series/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'id':index,
			'title': name,
			'type':'series',
			'videopath': `${name}/${files[0]}`,
		});
		index ++;
	});
	res.json(response);
});

module.exports = router;