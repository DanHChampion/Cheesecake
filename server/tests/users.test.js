const { MongoClient } = require('mongodb');

describe('users - unit testing', () => {
	let connection;
	let db;

	beforeAll(async () => {
		connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		db = await connection.db(globalThis.__MONGO_DB_NAME__);
	});

	afterAll(async () => {
		await connection.close();
	});

	test('should insert a new user into collection', async () => {
		const users = db.collection('users');

		const mockUser = {_id: 'some-user-id', name: 'John'};
		await users.insertOne(mockUser);

		const newUser = await users.findOne({_id: 'some-user-id'});
		expect(newUser).toEqual(mockUser);
	});

});

