// const request = require('supertest');
const express = require('express');
const router = require('../routes/continueWatching');
const app = express();
app.use('/', router);

describe('GET /continueWatching/:id', () => {
	it('checks if 1 = 1', () => {
		expect(1).toEqual(1);
	});
});

describe('POST /continueWatching/:id', () => {
	it('checks if 1 = 1', () => {
		expect(1).toEqual(1);
	});
});

describe('DELETE /continueWatching/:id/:cwid', () => {
	it('checks if 1 = 1', () => {
		expect(1).toEqual(1);
	});
});