const mongoose = require('mongoose');

function validateUserObject(user) {
	const keys = Object.keys(user);
	if (keys.length !== 2 ||
		!keys.includes('name') ||
		!keys.includes('avatar')) {
		return false;
	}
	return true;
}

let mockedUsers = [];

const findMock = (filterOption = null) => {
	if (filterOption === null) {
		return mockedUsers;
	}
	const filterKey = Object.keys(filterOption)[0];
	return mockedUsers.filter(item => item[filterKey] === filterOption[filterKey]) || null;
};

const findByIdMock = (id) => {
	return mockedUsers.find(user => user._id === id) || null;
};

const findByIdAndRemoveMock = (id) => {
	mockedUsers = mockedUsers.filter(user => {return user._id !== id;});
};

const createUser = async (body) => {
	if (!validateUserObject(body)){
		throw new Error('Bad formatting');
	}
	const generatedId = new mongoose.Types.ObjectId();
	const fakeUser = {
		_id: generatedId.toString(),
		name: body.name,
		avatar: body.avatar
	};
	mockedUsers.push(fakeUser);
	return {
		userId: fakeUser._id
	};
};

const updateUser = async (updatedUser) => {
	const index = mockedUsers.findIndex(user => user._id === updatedUser._id);
	if (index !== -1) {
		mockedUsers[index] = updatedUser;
	}
	return updatedUser;
};

const _setMock = (users) => {
	mockedUsers = users;
};

const mockUser = {
	find: findMock,
	findById: findByIdMock,
	findByIdAndRemove: findByIdAndRemoveMock,
	createUser: createUser,
	updateUser: updateUser,
	_setMock: _setMock
};

module.exports = mockUser;
