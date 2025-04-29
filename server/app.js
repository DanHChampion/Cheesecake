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
} else {
	throw new Error('No database URL provided. Update .env file!');
}

// JSON Middleware
app.use(express.json());

// CORS Policy
const cors = require('cors');
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'];

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
