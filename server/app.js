const express = require('express');
const app = express();
const usersRoute = require('./routes/users.js');
const watchlistRoute = require('./routes/watchlist.js');
const videoRoute = require('./routes/video.js');

app.use('/users', usersRoute);
app.use('/watchlist', watchlistRoute);
app.use('/video', videoRoute);

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