require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

// const mongoose = require('mongoose');

// Database
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('Connected to Database!'));

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

// Routes
const usersRoute = require('./routes/users.js');
const watchlistRoute = require('./routes/watchlist.js');
const streamRoute = require('./routes/stream.js');
const videoRoute = require('./routes/videos.js');

app.use('/users', usersRoute);
app.use('/watchlist', watchlistRoute);
app.use('/stream', streamRoute);
app.use('/videos', videoRoute);

// For images
const dir = path.join(__dirname, 'images');
app.use(express.static(dir));

app.get('/contwatch', (req, res) => { // Might need to change name of endpoint
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(continue_watching_list);
});

app.get('/movies', (req, res) => { // Might need to change name of endpoint
	let itemList = [];
	for (let key in all_videos) {
		itemList.push(all_videos[key]);
	}
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(itemList);
});

module.exports = app;

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

const all_videos = {
	'1':{
		'id': 1,
		'title': 'Breaking Bad',
		'type': 'clips',
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
		'type': 'movies',
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