require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Database
if (process.env.DATABASE_URL) {
	mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		serverSelectionTimeoutMS: 1000
	});
	const db = mongoose.connection;
	db.on('error', (error) => {throw new Error(error);});
	db.once('open', () => console.log('Connected to Database!'));
}

// JSON Middleware
app.use(express.json());

// CORS Policy
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.5:3000'];

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials:true, //access-control-allow-credentials:true
	optionSuccessStatus:200
};
app.use(cors(corsOptions));

app.get('/recommend', (req, res) => { // Might need to change name of endpoint
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(recommended);
});

// Routes
const usersRoute = require('./routes/users.js');
const watchlistRoute = require('./routes/watchlist.js');
const streamRoute = require('./routes/stream.js');
const videoRoute = require('./routes/videos.js');
const imageRoute = require('./routes/images.js');
const continueWatchingRoute = require('./routes/continueWatching.js');

app.use('/users', usersRoute);
app.use('/watchlist', watchlistRoute);
app.use('/stream', streamRoute);
app.use('/videos', videoRoute);
app.use('/images', imageRoute);
app.use('/continuewatching', continueWatchingRoute);

// For static
const dir = path.join(__dirname, 'static');
app.use(express.static(dir));

module.exports = app;

const recommended = [
	{
		'id': 7,
		'title': 'Banana'
	},
	{
		'id': 8,
		'title': 'My Friend Dahmer'
	},
	{
		'id': 9,
		'title': 'Gold'
	},
	{
		'id': 17,
		'title': 'Captain Fall'
	},
	{
		'id': 18,
		'title': 'In Time'
	},
	{
		'id': 19,
		'title': 'The Hunger Games'
	},{
		'id': 27,
		'title': 'Pixels'
	},
	{
		'id': 28,
		'title': 'Hoops'
	},
	{
		'id': 29,
		'title': 'Paradise PD'
	}
];