'use strict';

const request = require('supertest');
const app = require('../app');

describe('Test all GET methods in app.js', () => {

	// Testing GET Methods
	// Users Section // CURRENTLY NO DATABASE
	// test('GET /users successful', () => {
	// 	return request(app)
	// 		.get('/users')
	// 		.expect(200);
	// });
	// test('GET /users returns JSON', () => {
	// 	return request(app)
	// 		.get('/users')
	// 		.expect('Content-type', /json/);
	// });

	// Continue Watching Section

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
});