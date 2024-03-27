const intialiseMockedUsers = [
	{
		_id: '1',
		name: 'Johnathan',
		avatar: 'fake/path.jpg'
	},
	{
		_id: '2',
		name: 'Damien',
		avatar: 'fake/path.jpg'
	}
];

let mockedUsers = intialiseMockedUsers;

const findMock = () => {return mockedUsers;};

const findByIdMock = (id) => {
	return mockedUsers.find(user => user._id === id) || null;
};

const saveMock = (user) => {
	mockedUsers.push(user);
	return user;
};

function resetMock() {
	mockedUsers = intialiseMockedUsers;
}

function validateUserObject(user) {
	const keys = Object.keys(user);
	if (keys.length !== 2 ||
		!keys.includes('name') ||
		!keys.includes('avatar')) {
		return false;
	}
	return true;
}

const mockUser = {
	find: findMock,
	findById: findByIdMock,
	save: saveMock,
	_resetMock: resetMock,
	_validateUserObject: validateUserObject,
	__value: mockedUsers
};

module.exports = mockUser;
