const express = require('express');
const app = express();
const PORT = 8080;

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
		'title': 'Scott Pilgrim vs The World'
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
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(random_movies);
});

app.listen(
	PORT,
	() => console.log(`Running on http://localhost:${PORT}`)
);

module.exports = app;