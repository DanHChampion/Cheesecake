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
const imageRoute = require('./routes/images.js');

app.use('/users', usersRoute);
app.use('/watchlist', watchlistRoute);
app.use('/stream', streamRoute);
app.use('/videos', videoRoute);
app.use('/images', imageRoute);


// For images
const dir = path.join(__dirname, 'images');
app.use(express.static(dir));

app.get('/contwatch', (req, res) => { // Might need to change name of endpoint
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(continue_watching_list);
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