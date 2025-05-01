const mongoose = require('mongoose');

function validateContinueWatchingObject(continuewatching) {
	const keys = Object.keys(continuewatching);
	if (keys.length !== 5 ||
		!keys.includes('type') ||
		!keys.includes('title') ||
		!keys.includes('path') ||
		!keys.includes('timestamp') ||
		!keys.includes('duration')) {
		return false;
	}
	return true;
}

let mockedContinueWatching = [];

const findMock = (filterOption = null) => {
	if (filterOption === null) {
		return mockedContinueWatching;
	}
	const filterKey = Object.keys(filterOption)[0];
	return mockedContinueWatching.filter(item => item[filterKey] === filterOption[filterKey]) || null;
};

const findByIdMock = (id) => {
	return mockedContinueWatching.find(item => item._id === id) || null;
};

const findByIdAndRemoveMock = (id) => {
	mockedContinueWatching = mockedContinueWatching.filter(item => {return item._id !== id;});
};

const createContinueWatching = async (user, body) => {
	if (!validateContinueWatchingObject(body)){
		throw new Error('Bad formatting');
	}
	const generatedId = new mongoose.Types.ObjectId();
	const fakeItem = {
		_id: generatedId.toString(),
		userId: user._id,
		title: body.title,
		type: body.type,
		path: body.path,
		timestamp: body.timestamp,
		duration: body.duration
	};
	mockedContinueWatching.push(fakeItem);
	return fakeItem;
};

const _setMock = (continuewatching) => {
	mockedContinueWatching = continuewatching;
};

const mockContinueWatching = {
	find: findMock,
	findById: findByIdMock,
	findByIdAndRemove: findByIdAndRemoveMock,
	createContinueWatching: createContinueWatching,
	_setMock: _setMock
};

module.exports = mockContinueWatching;
