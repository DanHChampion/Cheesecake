const express = require('express');
const fs = require('fs');
const app = express();

// JSON Middleware
app.use(express.json());

// CORS Policy
const cors = require('cors');
const corsOptions = {
	origin:'http://localhost:3000',
	credentials:true, //access-control-allow-credentials:true
	optionSuccessStatus:200
};
app.use(cors(corsOptions));

app.get('/users', (req, res) => {
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(users);
});

app.get('/contwatch', (req, res) => { // Might need to change name of endpoint
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(continue_watching_list);
});

app.get('/watchlist', (req, res) => { // Might need to change name of endpoint
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(watchlist);
});

app.get('/movies', (req, res) => { // Might need to change name of endpoint
	let itemList = []
	for (let key in all_videos) {
		itemList.push(all_videos[key]);
	};
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(itemList);
});

// Video Streaming Element
// Code from: https://youtu.be/ZjBLbXUuyWg
app.get('/video/:id', function(req, res) {
	const range = req.headers.range;
	if (!range) {
		res.status(400).send('Requires Range header');
		return;
	}
	// Comply with any videos paths
	const path = all_videos[req.params.id].videopath;
	const type = all_videos[req.params.id].type;
	let directory = '';
	if (type == 'movie') directory = 'Movies';
	if (type == 'series') directory = 'Series';
	if (type == 'clip') directory = 'Clips';

	const videoPath = `./videos/${directory}/${path}`;
	const videoSize = fs.statSync(videoPath).size;

	// Parse Range
	// Example: "bytes=32324-"
	const CHUNK_SIZE = 10 ** 6; // 1MB
	const start = Number(range.replace(/\D/g, ''));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

	const contentLength = end - start + 1;
	const headers = {
		'Content-Range': `bytes ${start}-${end}/${videoSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': contentLength,
		'Content-Type': 'video/mp4', // Maybe .mk4 type, be cautious
	};

	res.writeHead(206, headers);

	const videoStream = fs.createReadStream(videoPath, { start, end });

	videoStream.pipe(res);
});


module.exports = app;

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

const continue_watching_list = [
	{
		'id': 1,
		'title': 'Breaking Bad',
		'timestamp': null
	},
	{
		'id': 2,
		'title': 'Power Rangers: SPD',
		'timestamp': null
	},
	{
		'id': 3,
		'title': 'Scott Pilgrim vs The World',
		'timestamp': null
	}
];

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

const random_movies = [
	{
		'id': 7,
		'title': 'Ant-Man'
	},
	{
		'id': 8,
		'title': 'Spirited Away'
	},
	{
		'id': 9,
		'title': 'Drive'
	}
];

const all_videos = {
	'1':{
		'id': 1,
		'title': 'Breaking Bad',
		'type': 'clip',
		'videopath': 'Is Anything Real.mp4'
	},
	'2':{
		'id': 2,
		'title': 'Power Rangers: SPD',
		'type': 'series',
		'videopath': 'Jungle Casio.mp4'
	},
	'3': {
		'id': 3,
		'title': 'Scott Pilgrim vs The World',
		'type': 'movie',
		'videopath': 'Cant Stop.mp4'
	},
	'4': {
		'id': 4,
		'title': 'Flapjack',
		'type': 'series',
		'videopath': 'Jungle Casio.mp4'
	},
	'5': {
		'id': 5,
		'title': 'Daredevil',
		'type': 'series',
		'videopath': 'Jungle Casio.mp4'
	},
	'6': {
		'id': 6,
		'title': 'The Interview',
		'type': 'movie',
		'videopath': 'Cant Stop.mp4'
	},
	'7': {
		'id': 7,
		'title': 'Ant-Man',
		'type': 'movie',
		'videopath': 'Cant Stop.mp4'
	},
	'8':{
		'id': 8,
		'title': 'Spirited Away',
		'type': 'movie',
		'videopath': 'Cant Stop.mp4'
	},
	'9':{
		'id': 9,
		'title': 'Drive',
		'type': 'movie',
		'videopath': 'Cant Stop.mp4'
	}
};