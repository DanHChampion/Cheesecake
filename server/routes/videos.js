require('dotenv').config();
const express = require('express');
const router = express.Router();
const { readdirSync } = require('fs');
const videoDir = process.env.VIDEODIR? process.env.VIDEODIR : './videos';
console.log('Video Directory:',videoDir);

// Getting movie
router.get('/movies', async (req, res) => {
	const list = readdirSync(videoDir+'/Movies', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let response = [];
	for (const [index, name] of list.entries()) {
		let files = readdirSync(videoDir+'/Movies/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'_id':index,
			'title': name,
			'type':'movie',
			'path': `${name}/${files[0]}`,
		});
	}
	res.json(response);
});

// Getting series
router.get('/series', async (req, res) => {
	const list = readdirSync(videoDir+'/Series', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let response = [];
	for (const [index, name] of list.entries()) {
		let files = readdirSync(videoDir+'/Series/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'_id':index,
			'title': name,
			'type':'series',
			'path': `${name}/${files[0]}`,
		});
	}
	res.json(response);
});

// Getting series seasons folders
router.get('/series/seasons/:title', async (req, res) => {
	try {
		res.json(readdirSync(videoDir+'/Series/'+req.params.title, { withFileTypes: true })
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name));
	} catch {
		res.status(400);
	}
});

// Getting all episodes within a season
router.get('/series/:title/:season', async (req, res) => {
	try {
		const season = req.params.season;
		const title = req.params.title;
		const list = readdirSync(videoDir+'/Series/'+title+'/'+season, { withFileTypes: true })
			.map(dirent => dirent.name);

		let response = [];
		for (const [index, name] of list.entries()) {
			const epTitle = name.replace(/\.[^/.]+$/, '');
			response.push({
				'episode': index+1,
				'title': epTitle,
				'path': title+'/'+season+'/'+name,
			});
		}
		res.json(response);
	}
	catch{
		res.status(400);
	}

});

// Getting next episode based on given episode
router.get('/series/:title/:season/:episode', async (req, res) => {
	try {
		// Get list
		const season = req.params.season;
		const title = req.params.title;
		const episode = req.params.episode;
		const list = readdirSync(videoDir+'/Series/'+title+'/'+season, { withFileTypes: true })
			.map(dirent => dirent.name);

		// Find next episode
		let flag = false;
		for (const [index, name] of list.entries()) {
			if (name === episode){
				if (list[index+1] !== undefined) {
					flag = true;
					res.json(season+'/'+list[index+1]);
				}
			}
		}
		if (!flag) res.json(null);
	}
	catch{
		res.status(404);
	}

});

// Getting all videos
router.get('/all', async (req, res) => {
	const moviesList = readdirSync(videoDir+'/Movies', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	let response = [];
	let index = 0;
	moviesList.forEach(name => {
		let files = readdirSync(videoDir+'/Movies/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'id':index,
			'title': name,
			'type':'movie',
			'path': `${name}/${files[0]}`,
		});
		index ++;
	});
	const seriesList = readdirSync(videoDir+'/Series', { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	seriesList.forEach(name => {
		let files = readdirSync(videoDir+'/Series/'+name, { withFileTypes: true })
			.map(dirent => dirent.name);
		response.push({
			'id':index,
			'title': name,
			'type':'series',
			'path': `${name}/${files[0]}`,
		});
		index ++;
	});
	res.json(response);
});

module.exports = router;