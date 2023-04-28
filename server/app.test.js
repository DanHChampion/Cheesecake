'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test all GET methods in app.js', () => {

	// Testing GET Methods
	// Users Section
	test('GET /users successful', () => {
		return request(app)
			.get('/users')
			.expect(200);
	});
	test('GET /users returns JSON', () => {
		return request(app)
			.get('/users')
			.expect('Content-type', /json/);
	});
	test('GET /users returns JSON containing Dan', () => {
		return request(app)
			.get('/users')
			.expect(/Dan/);
	});
	test('GET /users returns JSON with 3 items', async () => {
		let response = await request(app).get('/users');
		let usersLength = JSON.parse(JSON.stringify(response.body)).length;
		expect(usersLength).toBe(3);
	});

	// Continue Watching Section
	test('GET /contwatch successful', () => {
		return request(app)
			.get('/contwatch')
			.expect(200);
	});
	test('GET /contwatch returns JSON', () => {
		return request(app)
			.get('/contwatch')
			.expect('Content-type', /json/);
	});
	test('GET /contwatch returns JSON containing Breaking Bad', () => {
		return request(app)
			.get('/contwatch')
			.expect(/Breaking Bad/);
	});
	test('GET /contwatch returns JSON with 3 items', async () => {
		let response = await request(app).get('/contwatch');
		let usersLength = JSON.parse(JSON.stringify(response.body)).length;
		expect(usersLength).toBe(3);
	});

	// Watchlist Section
	test('GET /watchlist successful', () => {
		return request(app)
			.get('/watchlist')
			.expect(200);
	});
	test('GET /watchlist returns JSON', () => {
		return request(app)
			.get('/watchlist')
			.expect('Content-type', /json/);
	});
	test('GET /watchlist returns JSON containing Daredevil', () => {
		return request(app)
			.get('/watchlist')
			.expect(/Daredevil/);
	});
	test('GET /watchlist returns JSON with 3 items', async () => {
		let response = await request(app).get('/watchlist');
		let usersLength = JSON.parse(JSON.stringify(response.body)).length;
		expect(usersLength).toBe(3);
	});

	// Random Movies Section
	test('GET /movies successful', () => {
		return request(app)
			.get('/movies')
			.expect(200);
	});
	test('GET /movies returns JSON', () => {
		return request(app)
			.get('/movies')
			.expect('Content-type', /json/);
	});
});