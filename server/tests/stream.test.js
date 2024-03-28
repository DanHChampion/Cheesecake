const request = require('supertest');
const express = require('express');
const fs = require('fs');
const router = require('../routes/stream');
const app = express();
app.use('/', router);

jest.mock('fs');
fs.statSync.mockReturnValue({ size: 10000 });
fs.createReadStream.mockReturnValue({
	pipe: jest.fn((res) => {
		res.end('test'); // Pipe some data to the response
	}),
});

describe('GET /stream', () => {
	it('should return video content with correct range header', async () => {
		let path = encodeURIComponent('Test Movie/Cheesecake.mp4');
		const range = 'bytes=9999-'; // Example range
		const response = await request(app)
			.get('/movie/'+path)
			.set('Range', range);

		expect(response.status).toBe(206);
		expect(response.headers['content-type']).toEqual('video/mp4');
		expect(response.headers['content-length']).toEqual('1');

		expect(fs.createReadStream).toHaveBeenCalledWith(
			'./videos/Movies/Test Movie/Cheesecake.mp4',
			{ start: 9999, end: 9999 }
		);
	});

	it('responds with 400 with missing range header', async () => {
		let path = encodeURIComponent('Test Movie/Cheesecake.mp4');
		const response = await request(app).get('/movie/'+path);
		expect(response.statusCode).toBe(400);
	});
});
