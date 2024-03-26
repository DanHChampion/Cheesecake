const request = require('supertest');
const express = require('express');
const router = require('../routes/videos');
const app = express();
const fs = require('fs');
const fsMock = require('./__mocks__/fsMock');
const FakeDirent = require('./__mocks__/FakeDirent');
app.use('/', router);
jest.mock('fs');

beforeEach(() => {
	fsMock._clearMockFiles();
	fs.existsSync.mockImplementation((path) => {
		return fsMock.existsSync(path);
	});
	fs.readdirSync.mockImplementation((path) => {
		return fsMock.readdirSync(path);
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

describe('GET /movies', () => {
	it('responds with JSON containing a list of movie objects', async () => {
		fsMock._setMockFiles({
			'./videos/Movies': [
				new FakeDirent('Movie1', true),
				new FakeDirent('Movie2', true),
				new FakeDirent('Movie3', true),
				new FakeDirent('NoMovie', true)
			],
			'./videos/Movies/Movie1': [
				new FakeDirent('Movie1.mp4')
			],
			'./videos/Movies/Movie2': [
				new FakeDirent('Movie2.mkv'),
				new FakeDirent('Movie2.jpg')
			],
			'./videos/Movies/Movie3': [
				new FakeDirent('Movie3.jpg')
			],
			'./videos/Movies/NoMovie': []
		});
		const response = await request(app).get('/movies');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body).toHaveLength(2);

		response.body.forEach(movie => {
			expect(movie).toHaveProperty('_id');
			expect(movie).toHaveProperty('title');
			expect(movie).toHaveProperty('type', 'movie');
			expect(movie).toHaveProperty('path');
		});
	});
	it('responds with 404 if Movies directory doesn\'t exist', async () => {
		fsMock._setMockFiles({});
		const response = await request(app).get('/movies');
		expect(response.statusCode).toBe(404);
	});
});

describe('GET /series', () => {
	it('responds with JSON containing a list of series', async () => {
		fsMock._setMockFiles({
			'./videos/Series': [
				new FakeDirent('Series1', true),
				new FakeDirent('Series2', true),
				new FakeDirent('EmptySeries', true)
			],
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true),
			],
			'./videos/Series/Series2': [
				new FakeDirent('Season1', true),
			],
			'./videos/Series/EmptySeries': []
		});
		const response = await request(app).get('/series');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body).toHaveLength(2);

		response.body.forEach(series => {
			expect(series).toHaveProperty('_id');
			expect(series).toHaveProperty('title');
			expect(series).toHaveProperty('type', 'series');
			expect(series).toHaveProperty('path');
		});
	});
	it('responds with 404 if Series directory does not exist', async () => {
		fsMock._setMockFiles({});
		const response = await request(app).get('/series');
		expect(response.statusCode).toBe(404);
	});
});

describe('GET /series/seasons/:title', () => {
	it('responds with JSON containing a list of seasons for a given series title', async () => {
		fsMock._setMockFiles({
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true),
			],
			'./videos/Series/Series2': [
				new FakeDirent('Season1', true),
			],
			'./videos/Series/Series2/Season1': [
				new FakeDirent('Series2.png'),
			],
			'./videos/Series/EmptySeries': []
		});
		const response1 = await request(app).get('/series/seasons/Series1');
		expect(response1.statusCode).toBe(200);
		expect(response1.body).toBeDefined();
		expect(response1.body).toHaveLength(2);

		const response2 = await request(app).get('/series/seasons/Series2');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.body).toHaveLength(1);

		const response3 = await request(app).get('/series/seasons/EmptySeries');
		expect(response3.statusCode).toBe(200);
		expect(response3.body).toBeDefined();
		expect(response3.body).toHaveLength(0);
	});
	it('responds with 404 if no series is found given title', async () => {
		fsMock._setMockFiles({
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true),
			],
			'./videos/Series/Series2': [
				new FakeDirent('Season1', true)
			]
		});
		const response = await request(app).get('/series/seasons/Series3');
		expect(response.statusCode).toBe(404);
	});
});

describe('GET /series/:title/:season', () => {
	it('responds with JSON containing a list of Episode objects for a given series title and season', async () => {
		fsMock._setMockFiles({
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true)
			],
			'./videos/Series/Series1/Season1': [
				new FakeDirent('Episode1.mp4'),
				new FakeDirent('Episode2.mp4')
			],
			'./videos/Series/Series1/Season2': [
				new FakeDirent('Episode1.mp4'),
				new FakeDirent('Episode2.mp4'),
				new FakeDirent('Episode3.mp4'),
				new FakeDirent('Episode4.mp4')
			]
		});
		const response1 = await request(app).get('/series/Series1/Season1');
		expect(response1.statusCode).toBe(200);
		expect(response1.body).toBeDefined();
		expect(response1.body).toHaveLength(2);

		response1.body.forEach(episode => {
			expect(episode).toHaveProperty('episode');
			expect(episode).toHaveProperty('title');
			expect(episode).toHaveProperty('path');
		});
		const response2 = await request(app).get('/series/Series1/Season2');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.body).toHaveLength(4);

		response2.body.forEach(episode => {
			expect(episode).toHaveProperty('episode');
			expect(episode).toHaveProperty('title');
			expect(episode).toHaveProperty('path');
		});
	});
	it('responds with 404 if no series is found given title', async () => {
		fsMock._setMockFiles({
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true)
			],
			'./videos/Series/Series1/Season1': [
				new FakeDirent('Episode1.mp4', true)
			]
		});
		const response1 = await request(app).get('/series/Series1/Season2');
		expect(response1.statusCode).toBe(404);
		const response2 = await request(app).get('/series/Series2/Season1');
		expect(response2.statusCode).toBe(404);
	});
});

describe('GET /series/:title/:season/:episode', () => {
	it('responds with JSON containing the next episode for a given series title, season, and episode', async () => {
		fsMock._setMockFiles({
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true)
			],
			'./videos/Series/Series1/Season1': [
				new FakeDirent('Episode1.mp4'),
				new FakeDirent('Episode2.mp4'),
				new FakeDirent('Episode3.mp4')
			],
			'./videos/Series/Series1/Season2': [
				new FakeDirent('Episode1.mp4'),
				new FakeDirent('Episode2.mp4'),
				new FakeDirent('Episode3.mp4')
			],
			'./videos/Series/Series1/Season1/Episode1.mp4': null,
			'./videos/Series/Series1/Season1/Episode3.mp4': null
		});
		const response1 = await request(app).get('/series/Series1/Season1/Episode1.mp4');
		expect(response1.statusCode).toBe(200);
		expect(response1.body).toEqual('Season1/Episode2.mp4');

		// Should get first episode of next season
		const response2 = await request(app).get('/series/Series1/Season1/Episode3.mp4');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toEqual('Season2/Episode1.mp4');
	});
	it('responds with nullObject if next episode does not exist', async () => {
		fsMock._setMockFiles({
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true)
			],
			'./videos/Series/Series1/Season1': [
				new FakeDirent('Episode1.mp4'),
				new FakeDirent('Episode2.mp4'),
				new FakeDirent('Episode3.mp4')
			],
			'./videos/Series/Series1/Season2': [
				new FakeDirent('Episode1.mp4'),
				new FakeDirent('Episode2.mp4'),
				new FakeDirent('Episode3.mp4')
			],
			'./videos/Series/Series1/Season2/Episode3.mp4': null,
		});
		const response = await request(app).get('/series/Series1/Season2/Episode3.mp4');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(null);
	});
	it('responds with 404 if episode not found', async () => {
		fsMock._setMockFiles({
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true)
			],
			'./videos/Series/Series1/Season1': [
				new FakeDirent('Episode1.mp4'),
				new FakeDirent('Episode2.mp4'),
				new FakeDirent('Episode3.mp4')
			]
		});
		const response1 = await request(app).get('/series/Series1/Season1/NonExistingEpisodeName.mp4');
		expect(response1.statusCode).toBe(404);
		const response2 = await request(app).get('/series/Series2/Season1/Episode1.mp4');
		expect(response2.statusCode).toBe(404);
	});
});

describe('GET /all', () => {
	it('responds with JSON containing a list of all videos (Movies + Series)', async () => {
		fsMock._setMockFiles({
			'./videos/Movies': [
				new FakeDirent('Movie1', true),
				new FakeDirent('Movie2', true),
				new FakeDirent('Movie3', true),
				new FakeDirent('NoMovie', true)
			],
			'./videos/Movies/Movie1': [
				new FakeDirent('Movie1.mp4')
			],
			'./videos/Movies/Movie2': [
				new FakeDirent('Movie2.mkv'),
				new FakeDirent('Movie2.jpg')
			],
			'./videos/Movies/Movie3': [
				new FakeDirent('Movie3.jpg')
			],
			'./videos/Movies/NoMovie': [],
			'./videos/Series': [
				new FakeDirent('Series1', true),
				new FakeDirent('Series2', true),
				new FakeDirent('EmptySeries', true)
			],
			'./videos/Series/Series1': [
				new FakeDirent('Season1', true),
				new FakeDirent('Season2', true),
			],
			'./videos/Series/Series2': [
				new FakeDirent('Season1', true),
			],
			'./videos/Series/EmptySeries': []
		});
		const response = await request(app).get('/all');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body).toHaveLength(4);

		// Check for no duplicate IDs
		let duplicateIds = false;
		let idList = [];
		response.body.forEach(item => {
			expect(item).toHaveProperty('_id');
			expect(item).toHaveProperty('title');
			expect(item).toHaveProperty('type');
			expect(item).toHaveProperty('path');
			if (idList.includes(item._id)) {
				duplicateIds = true;
			}
			idList.push(item._id);
		});
		expect(duplicateIds).toBe(false);
	});
	it('responds with 404 if no valid Movies or Series is found', async () => {
		fsMock._setMockFiles({
			'./videos/Movies': [],
			'./videos/Series/Series1': [
				new FakeDirent('Season1.mp4')
			],
		});
		const response = await request(app).get('/all');
		expect(response.statusCode).toBe(404);
	});
});