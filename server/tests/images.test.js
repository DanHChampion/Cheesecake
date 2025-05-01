const request = require('supertest');
const express = require('express');
const router = require('../routes/images');
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

describe('GET /images/avatars', () => {
	it('responds with a list of avatar paths', async () => {
		fsMock._setMockFiles({
			'./static/_avatars': [
				new FakeDirent('Avatar1.jpg'),
				new FakeDirent('Avatar2.jpg'),
				new FakeDirent('Avatar3.jpg'),
				new FakeDirent('Avatar4.jpg')
			]
		});
		const response = await request(app).get('/avatars');
		expect(response.statusCode).toBe(200);
		expect(response.headers['content-type']).toMatch(/json/);
		expect(response.body).toHaveLength(4);

		response.body.forEach(avatar => {
			expect(avatar).toHaveProperty('id');
			expect(avatar).toHaveProperty('path');
		});
	});
});
describe('POST /images/upload', () => {
	it('should upload a cover photo', () => {
		// TO DO
		// const response = await request(app).get('/upload/coverphoto/Movie1');
		expect(1).toEqual(1);
	});

	it('should upload a preview', () => {
		// TO DO
		// const response = await request(app).get('/upload/preview/Movie1');
		expect(1).toEqual(1);
	});

	it('should upload a title image', () => {
		// TO DO
		// const response = await request(app).get('/upload/title/Movie1');
		expect(1).toEqual(1);
	});
});
