const express = require('express');
const router = express.Router();
const fs = require('fs');


// Video Streaming Element
// Code from: https://youtu.be/ZjBLbXUuyWg
router.get('/:type/:path', function(req, res) {
	const range = req.headers.range;
	if (!range) {
		res.status(400).send('Requires Range header');
		return;
	}

	let type = req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1);
	if (type === 'Movie'){
		type = type + 's';
	}
	const path = decodeURIComponent(req.params.path);

	const videoPath = `./videos/${type}/${path}`; // Relative to app.js
	const videoSize = fs.statSync(videoPath).size;

	// Parse Range
	// Example: "bytes=32324-"
	const CHUNK_SIZE = 10 ** 6; // 1MB
	const start = Number(range.replace(/\D/g, ''));
	let end = Math.min(start + CHUNK_SIZE, videoSize - 1);

	if (end < 0) end = 0;

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

module.exports = router;


// const all_videos = {
// 	'1':{
// 		'id': 1,
// 		'title': 'Breaking Bad',
// 		'type': 'clip',
// 		'videopath': 'Is Anything Real.mp4'
// 	},
// 	'2':{
// 		'id': 2,
// 		'title': 'Power Rangers: SPD',
// 		'type': 'series',
// 		'videopath': 'Jungle Casio.mp4'
// 	},
// 	'3': {
// 		'id': 3,
// 		'title': 'Scott Pilgrim vs The World',
// 		'type': 'movie',
// 		'videopath': 'Cant Stop.mp4'
// 	},
// 	'4': {
// 		'id': 4,
// 		'title': 'Flapjack',
// 		'type': 'series',
// 		'videopath': 'Jungle Casio.mp4'
// 	},
// 	'5': {
// 		'id': 5,
// 		'title': 'Daredevil',
// 		'type': 'series',
// 		'videopath': 'Jungle Casio.mp4'
// 	},
// 	'6': {
// 		'id': 6,
// 		'title': 'The Interview',
// 		'type': 'movie',
// 		'videopath': 'Cant Stop.mp4'
// 	},
// 	'7': {
// 		'id': 7,
// 		'title': 'Ant-Man',
// 		'type': 'movie',
// 		'videopath': 'Cant Stop.mp4'
// 	},
// 	'8':{
// 		'id': 8,
// 		'title': 'Spirited Away',
// 		'type': 'movie',
// 		'videopath': 'Cant Stop.mp4'
// 	},
// 	'9':{
// 		'id': 9,
// 		'title': 'Drive',
// 		'type': 'movie',
// 		'videopath': 'Cant Stop.mp4'
// 	}
// };