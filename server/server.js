const e = require('express');
const app = require('./app');

const PORT = env.PORT || 5000;

app.listen(
	PORT,
	() => console.log(`Running Server on http://localhost:${PORT}`)
);