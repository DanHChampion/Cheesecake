require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const videoDir = process.env.VIDEODIR? process.env.VIDEODIR : './videos';

/**
 * GET - Video Streaming Element
 * Code from: https://youtu.be/ZjBLbXUuyWg
 */
router.get('/:type/:path', function(req, res) {
	const range = req.headers.range;
	if (!range) {
		return res.status(400).send('Requires Range header');
	}

	let type = req.params.type === 'movie'? req.params.type+'s': req.params.type;
	type = type.charAt(0).toUpperCase() + type.slice(1);

	const path = decodeURIComponent(req.params.path);
	const videoPath = `${videoDir}/${type}/${path}`; // Relative to app.js
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
