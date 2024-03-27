// const request = require('supertest');
const express = require('express');
const router = require('../routes/watchlist');
const app = express();
app.use('/', router);

describe('GET /watchlist/:id', () => {
	it('checks if 1 = 1', () => {
		expect(1).toEqual(1);
	});
});

describe('POST /watchlist/:id', () => {
	it('checks if 1 = 1', () => {
		expect(1).toEqual(1);
	});
});

describe('DELETE /watchlist/:id/:wid', () => {
	it('checks if 1 = 1', () => {
		expect(1).toEqual(1);
	});
});