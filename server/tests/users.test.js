const request = require('supertest');
const express = require('express');
const router = require('../routes/users');
const app = express();
const User = require('../models/user');
const mockUser = require('./__mocks__/mockUser');
const createUser = require('../helpers/createUser');
const updateUser = require('../helpers/updateUser');

app.use(express.json());
app.use('/', router);

jest.mock('../models/user');
jest.mock('../helpers/createUser');
jest.mock('../helpers/updateUser');

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
	User.find.mockImplementation(() => {
		return mockUser.find();
	});
	User.findById.mockImplementation((id) => {
		return mockUser.findById(id);
	});
	User.findByIdAndRemove.mockImplementation((id) => {
		return mockUser.findByIdAndRemove(id);
	});
	createUser.mockImplementation(async (body) => {
		return mockUser.createUser(body);
	});
	updateUser.mockImplementation(async (user) => {
		return mockUser.updateUser(user);
	});
});

afterEach(async () => {
	jest.clearAllMocks();
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
	it('responds with 404 if a specific user is not found', async () => {
		const response = await request(app).get('/3');
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('Cannot find user');
	});
});

describe('POST /users', () => {
	it('should insert a new user into collection', async () => {
		const newUser = {
			name: 'Alfred',
			avatar: 'fake/path.jpg'
		};
		const response1 = await request(app).post('/').send(newUser);
		expect(response1.status).toBe(201);
		expect(response1.body).toBeDefined();
		expect(response1.headers['content-type']).toMatch(/json/);
		expect(response1.body).toHaveProperty('userId');

		const newUserId = response1.body['userId'];

		const response2 = await request(app).get('/');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.headers['content-type']).toMatch(/json/);
		expect(response2.body).toHaveLength(3);

		const response3 = await request(app).get('/'+newUserId);
		expect(response3.statusCode).toBe(200);
		expect(response3.body).toBeDefined();
		expect(response3.headers['content-type']).toMatch(/json/);
		expect(response3.body).toHaveProperty('_id');
		expect(response3.body).toHaveProperty('name');
		expect(response3.body).toHaveProperty('avatar');
	});
	it('responds with 400 if invalid request', async () => {
		const newUser = {
			username: 'Alfred',
			avatars: 'fake/path.jpg'
		};
		const response = await request(app).post('/').send(newUser);
		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('Bad formatting');
	});
});

describe('PATCH /users/:id', () => {
	it('should update a specific user', async () => {
		const updatedUser = {
			name: 'Alfred',
			avatar: 'fake/path2.jpg'
		};
		const response = await request(app).patch('/1').send(updatedUser);
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toHaveProperty('_id');
		expect(response.body).toHaveProperty('name');
		expect(response.body).toHaveProperty('avatar');
		expect(response.body._id).toBe('1');
		expect(response.body.name).toBe('Alfred');
		expect(response.body.avatar).toBe('fake/path2.jpg');
	});
	it('responds with "No new changes" if request body has same values', async () => {
		const updatedUser = {
			name: 'Bruce',
			avatar: 'fake/path.jpg'
		};
		const response = await request(app).patch('/1').send(updatedUser);
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('No new changes');
	});
	it('responds with 400 if a request body does not include "name" or "avatar" properties', async () => {
		const updatedUser = {
			username: 'Alfred',
			avatarPath: 'fake/path2.jpg'
		};
		const response = await request(app).patch('/1').send(updatedUser);
		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('Bad formatting');
	});
	it('responds with 404 if a specific user is not found', async () => {
		const updatedUser = {
			name: 'Alfred',
			avatar: 'fake/path2.jpg'
		};
		const response = await request(app).patch('/3').send(updatedUser);
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('Cannot find user');
	});
});

describe('DELETE /users/:id', () => {
	it('should delete a specific user', async () => {
		const response1 = await request(app).delete('/2');
		expect(response1.statusCode).toBe(200);
		expect(response1.body.message).toBe('Deleted Damien');

		const response2 = await request(app).get('/');
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toBeDefined();
		expect(response2.headers['content-type']).toMatch(/json/);
		expect(response2.body).toHaveLength(1);
		expect(response2.body[0]._id).toBe('1');
		expect(response2.body[0].name).toBe('Bruce');

		const response3 = await request(app).get('/2');
		expect(response3.statusCode).toBe(404);
		expect(response3.body.message).toBe('Cannot find user');
	});
	it('responds with 404 if a specific user is not found', async () => {
		const response = await request(app).delete('/3');
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('Cannot find user');
	});
});

