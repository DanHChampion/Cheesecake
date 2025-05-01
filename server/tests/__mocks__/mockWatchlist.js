const mongoose = require('mongoose');

function validateWatchlistObject(watchlist) {
	const keys = Object.keys(watchlist);
	if (keys.length !== 3 ||
		!keys.includes('type') ||
		!keys.includes('title') ||
		!keys.includes('path')) {
		return false;
	}
	return true;
}

let mockedWatchlist = [];

const findMock = (filterOption = null) => {
	if (filterOption === null) {
		return mockedWatchlist;
	}
	const filterKey = Object.keys(filterOption)[0];
	return mockedWatchlist.filter(item => item[filterKey] === filterOption[filterKey]) || null;
};

const findByIdMock = (id) => {
	return mockedWatchlist.find(item => item._id === id) || null;
};

const findByIdAndRemoveMock = (id) => {
	mockedWatchlist = mockedWatchlist.filter(item => {return item._id !== id;});
};

const createWatchlist = async (user, body) => {
	if (!validateWatchlistObject(body)){
		throw new Error('Bad formatting');
	}
	const generatedId = new mongoose.Types.ObjectId();
	const fakeItem = {
		_id: generatedId.toString(),
		userId: user._id,
		title: body.title,
		type: body.type,
		path: body.path
	};
	mockedWatchlist.push(fakeItem);
	return fakeItem;
};

const _setMock = (watchlist) => {
	mockedWatchlist = watchlist;
};

const mockWatchlist = {
	find: findMock,
	findById: findByIdMock,
	findByIdAndRemove: findByIdAndRemoveMock,
	createWatchlist: createWatchlist,
	_setMock: _setMock
};

module.exports = mockWatchlist;
