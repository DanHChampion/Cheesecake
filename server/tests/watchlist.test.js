const request = require('supertest');
const express = require('express');
const router = require('../routes/watchlist');
const app = express();
const User = require('../models/user');
const Watchlist = require('../models/watchlist');
const mockUser = require('./__mocks__/mockUser');
const mockWatchlist = require('./__mocks__/mockWatchlist');
const createWatchlist = require('../helpers/createWatchlist');

app.use(express.json());
app.use('/', router);

jest.mock('../models/user');
jest.mock('../models/watchlist');
jest.mock('../helpers/createWatchlist');


beforeEach(() => {
	mockUser._setMock([
		{
			_id: '1',
			name: 'Bruce',
			avatar: 'fake/path.jpg'
		},
		{
			_id: '2',
			name: 'Damien',
			avatar: 'fake/path.jpg'
		}
	]);
	User.findById.mockImplementation((id) => {
		return mockUser.findById(id);
	});
	mockWatchlist._setMock([
		{
			_id: '1',
			userId: '1',
			type: 'movie',
			title: 'Movie1',
			path: 'Movie1/video.mp4'
		},
		{
			_id: '2',
			userId: '1',
			type: 'movie',
			title: 'Movie2',
			path: 'Movie2/video.mp4'
		},
		{
			_id: '3',
			userId: '2',
			type: 'movie',
			title: 'Movie2',
			path: 'Movie2/video.mp4'
		}
	]);
	Watchlist.find.mockImplementation((filterOption) => {
		return mockWatchlist.find(filterOption);
	});
	Watchlist.findById.mockImplementation((id) => {
		return mockWatchlist.findById(id);
	});
	Watchlist.findByIdAndRemove.mockImplementation((id) => {
		return mockWatchlist.findByIdAndRemove(id);
	});
	createWatchlist.mockImplementation(async (user, body) => {
		return mockWatchlist.createWatchlist(user, body);
	});
});

afterEach(async () => {
	jest.clearAllMocks();
});

describe('GET /watchlist/:id', () => {
	it('responds with JSON containing a list of specfic user\'s watchlist', async () => {
		const response1 = await request(app).get('/1');
		expect(response1.statusCode).toBe(200);
		expect(response1.body).toBeDefined();
		expect(response1.headers['content-type']).toMatch(/json/);
		expect(response1.body).toHaveLength(2);
		response1.body.forEach(item => {
			expect(item).toHaveProperty('_id');
			expect(item).toHaveProperty('userId');
			expect(item).toHaveProperty('title');
			expect(item).toHaveProperty('type');
			expect(item).toHaveProperty('path');
		});
		const response2 = await request(app).get('/2');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.headers['content-type']).toMatch(/json/);
		expect(response2.body).toHaveLength(1);
		response2.body.forEach(item => {
			expect(item).toHaveProperty('_id');
			expect(item).toHaveProperty('userId');
			expect(item).toHaveProperty('title');
			expect(item).toHaveProperty('type');
			expect(item).toHaveProperty('path');
		});
	});
	it('responds with 404 if a specific user not found', async () => {
		const response = await request(app).get('/3');
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('Cannot find user');
	});
});

describe('POST /watchlist/:id', () => {
	it('should add a new item to watchlist collection', async () => {
		const newItem = {
			type: 'series',
			title: 'Series1',
			path: 'Series1'
		};
		const response1 = await request(app).post('/1').send(newItem);
		expect(response1.statusCode).toBe(201);
		expect(response1.body).toBeDefined();
		expect(response1.headers['content-type']).toMatch(/json/);
		expect(response1.body).toHaveProperty('_id');
		expect(response1.body).toHaveProperty('userId');
		expect(response1.body).toHaveProperty('title');
		expect(response1.body).toHaveProperty('type');
		expect(response1.body).toHaveProperty('path');

		const response2 = await request(app).get('/1');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.headers['content-type']).toMatch(/json/);
		expect(response2.body).toHaveLength(3);
		response2.body.forEach(item => {
			expect(item).toHaveProperty('_id');
			expect(item).toHaveProperty('userId');
			expect(item).toHaveProperty('title');
			expect(item).toHaveProperty('type');
			expect(item).toHaveProperty('path');
		});
		const response3 = await request(app).get('/2');
		expect(response3.statusCode).toBe(200);
		expect(response3.body).toBeDefined();
		expect(response3.headers['content-type']).toMatch(/json/);
		expect(response3.body).toHaveLength(1);
		response3.body.forEach(item => {
			expect(item).toHaveProperty('_id');
			expect(item).toHaveProperty('userId');
			expect(item).toHaveProperty('title');
			expect(item).toHaveProperty('type');
			expect(item).toHaveProperty('path');
		});
	});
	it('responds with 403 if a specific user not found', async () => {
		const newItem = {
			type: 'movie',
			title: 'Movie1',
			path: 'Movie1/video.mp4'
		};
		const response = await request(app).post('/1').send(newItem);
		expect(response.statusCode).toBe(403);
		expect(response.body.message).toBe('Already in list');
	});
	it('responds with 400 if invalid request', async () => {
		const newItem = {
			uid: '1',
			types: 'Alfred',
			name: 'Movie1'
		};
		const response = await request(app).post('/1').send(newItem);
		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('Bad formatting');
	});
});

describe('DELETE /watchlist/:id/:wid', () => {
	it('should delete a specific item in watchlist collection', async () => {
		const response1 = await request(app).delete('/1/1');
		expect(response1.statusCode).toBe(201);
		expect(response1.body.message).toBe('Successfully Deleted');

		const response2 = await request(app).get('/1');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.headers['content-type']).toMatch(/json/);
		expect(response2.body).toHaveLength(1);
		expect(response2.body[0]._id).toBe('2');
		expect(response2.body[0].userId).toBe('1');
		expect(response2.body[0].title).toBe('Movie2');
		expect(response2.body[0].type).toBe('movie');
		expect(response2.body[0].path).toBe('Movie2/video.mp4');
	});
	it('responds with 404 if a specific item in watchlist collection is not found with associated user', async () => {
		const response1 = await request(app).delete('/1/3');
		expect(response1.statusCode).toBe(404);
		expect(response1.body.message).toBe('This user does not have this watchlist item');
	});
	it('responds with 404 if a specific user is not found', async () => {
		const response = await request(app).delete('/3/1');
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('Cannot find user');
	});
});