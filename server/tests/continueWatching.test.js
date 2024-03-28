const request = require('supertest');
const express = require('express');
const router = require('../routes/continueWatching');
const app = express();
const User = require('../models/user');
const ContinueWatching = require('../models/continueWatching');
const mockUser = require('./__mocks__/mockUser');
const mockContinueWatching = require('./__mocks__/mockContinueWatching');
const createContinueWatching = require('../helpers/createContinueWatching');

app.use(express.json());
app.use('/', router);

jest.mock('../models/user');
jest.mock('../models/continuewatching');
jest.mock('../helpers/createContinueWatching');


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
	mockContinueWatching._setMock([
		{
			_id: '1',
			userId: '1',
			type: 'movie',
			title: 'Movie1',
			path: 'Movie1/video.mp4',
			timestamp: 0,
			duration: 100
		},
		{
			_id: '2',
			userId: '1',
			type: 'movie',
			title: 'Movie2',
			path: 'Movie2/video.mp4',
			timestamp: 0,
			duration: 100
		},
		{
			_id: '3',
			userId: '2',
			type: 'movie',
			title: 'Movie2',
			path: 'Movie2/video.mp4',
			timestamp: 0,
			duration: 100
		}
	]);
	ContinueWatching.find.mockImplementation((filterOption) => {
		return mockContinueWatching.find(filterOption);
	});
	ContinueWatching.findById.mockImplementation((id) => {
		return mockContinueWatching.findById(id);
	});
	ContinueWatching.findByIdAndRemove.mockImplementation((id) => {
		return mockContinueWatching.findByIdAndRemove(id);
	});
	createContinueWatching.mockImplementation(async (user, body) => {
		return mockContinueWatching.createContinueWatching(user, body);
	});
});

afterEach(async () => {
	jest.clearAllMocks();
});

describe('GET /continuewatching/:id', () => {
	it('responds with JSON containing a specfic user\'s Continue Watching list', async () => {
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
			expect(item).toHaveProperty('timestamp');
			expect(item).toHaveProperty('duration');
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
			expect(item).toHaveProperty('timestamp');
			expect(item).toHaveProperty('duration');
		});
	});
	it('responds with 404 if a specific user not found', async () => {
		const response = await request(app).get('/3');
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('Cannot find user');
	});
});

describe('POST /continuewatching/:id', () => {
	it('should add a new item to Continue Watching collection', async () => {
		const newItem = {
			type: 'movie',
			title: 'Movie3',
			path: 'Movie3/video.mp4',
			timestamp: 0,
			duration: 100
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
		expect(response1.body).toHaveProperty('timestamp');
		expect(response1.body).toHaveProperty('duration');

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
			expect(item).toHaveProperty('timestamp');
			expect(item).toHaveProperty('duration');
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
			expect(item).toHaveProperty('timestamp');
			expect(item).toHaveProperty('duration');
		});
	});
	it('should replace Continue Watching item if there exists one with matching title', async () => {
		const newItem = {
			type: 'movie',
			title: 'Movie1',
			path: 'Movie1/video.mp4',
			timestamp: 5,
			duration: 100
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
		expect(response1.body).toHaveProperty('timestamp');
		expect(response1.body).toHaveProperty('duration');

		const response2 = await request(app).get('/1');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.headers['content-type']).toMatch(/json/);
		expect(response2.body).toHaveLength(2);
		response2.body.forEach(item => {
			expect(item).toHaveProperty('_id');
			expect(item).toHaveProperty('userId');
			expect(item).toHaveProperty('title');
			expect(item).toHaveProperty('type');
			expect(item).toHaveProperty('path');
			expect(item).toHaveProperty('timestamp');
			expect(item).toHaveProperty('duration');
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
			expect(item).toHaveProperty('timestamp');
			expect(item).toHaveProperty('duration');
		});
	});
	it('responds with 400 if invalid request', async () => {
		const newItem = {
			uid: '1',
			types: 'Alfred',
			name: 'Movie1',
			timestamp: '2'
		};
		const response = await request(app).post('/1').send(newItem);
		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('Bad formatting');
	});
});

describe('DELETE /continuewatching/:id/:cwid', () => {
	it('should delete a specific item in Continue Watching collection', async () => {
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
		expect(response2.body[0].timestamp).toBe(0);
		expect(response2.body[0].duration).toBe(100);
	});
	it('responds with 404 if a specific item in Continue Watching collection is not found with associated user', async () => {
		const response1 = await request(app).delete('/1/3');
		expect(response1.statusCode).toBe(404);
		expect(response1.body.message).toBe('This user does not have this Continue Watching item');
	});
	it('responds with 404 if a specific user is not found', async () => {
		const response = await request(app).delete('/3/1');
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('Cannot find user');
	});
});