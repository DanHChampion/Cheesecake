// const request = require('supertest');
const express = require('express');
const router = require('../routes/watchlist');
const app = express();
app.use('/', router);

describe('GET /watchlist', () => {
	it('checks if 1 = 1', () => {
		expect(1).toEqual(1);
	});
});