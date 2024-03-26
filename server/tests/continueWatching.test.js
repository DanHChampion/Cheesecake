// const request = require('supertest');
const express = require('express');
const router = require('../routes/continueWatching');
const app = express();
app.use('/', router);

describe('GET /continueWatching', () => {
	it('checks if 2 = 2', () => {
		expect(2).toEqual(2);
	});
});