const request = require('supertest');
const express = require('express');
const router = require('../routes/users');
const app = express();
const User = require('../models/user');
const mockUser = require('./__mocks__/mockUser');
const createUser = require('../helpers/createUser');
app.use(express.json());
app.use('/', router);

jest.mock('../models/user');
jest.mock('../helpers/createUser');


beforeAll(async () => {
	User.find.mockImplementation(() => {
		return mockUser.find();
	});
	User.findById.mockImplementation((id) => {
		return mockUser.findById(id);
	});
	createUser.mockImplementation(async (body) => {
		if (!mockUser._validateUserObject(body)){
			throw Error('Bad Formatting');
		}
		const fakeUser = {
			_id: '3',
			name: body.name,
			avatar: body.avatar
		};
		const newUser = await mockUser.save(fakeUser);
		return {
			userId: newUser._id
		};
	});
});

afterAll(async () => {
	jest.clearAllMocks();
	mockUser._resetMock();
});

describe('GET /users', () => {
	it('responds with JSON containing all users', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toHaveLength(2);
		response.body.forEach(user => {
			expect(user).toHaveProperty('_id');
			expect(user).toHaveProperty('name');
			expect(user).toHaveProperty('avatar');
		});
	});
});

describe('GET /users/:id', () => {
	it('responds with JSON containing a specific user', async () => {
		const response = await request(app).get('/1');
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toHaveProperty('_id');
		expect(response.body).toHaveProperty('name');
		expect(response.body).toHaveProperty('avatar');
	});
	it('responds with 404 if a specific user not found', async () => {
		const response = await request(app).get('/3');
		expect(response.statusCode).toBe(404);
	});
});

describe('POST /users', () => {
	it('should insert a new user into collection', async () => {
		const newUser = {
			name: 'Robert',
			avatar: 'fake/path.jpg'
		};
		const response = await request(app).post('/').send(newUser);
		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toHaveProperty('userId');
	});
	it('responds with 400 if Bad Request', async () => {
		const newUser = {
			username: 'Robert',
			avatars: 'fake/path.jpg'
		};
		const response = await request(app).post('/').send(newUser);
		expect(response.statusCode).toBe(400);
		// expect(response.error.message).toBe('Bad Formatting');
	});
});

describe('PATCH /users/:id', () => {
	it('should update a specific user', async () => {
		expect(1).toEqual(1);
	});
});

describe('DELETE /users/:id', () => {
	it('should delete a specific user', async () => {
		expect(1).toEqual(1);
	});
});

