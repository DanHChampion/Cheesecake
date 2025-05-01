'use strict';
let fsMock = {};
let mockFiles = {};

function _setMockFiles(files){
	mockFiles = files;
}

function _clearMockFiles(){
	mockFiles = {};
}

function existsSync(filePath) {
	return mockFiles[filePath] !== undefined;
}

function readdirSync(filePath) {
	if (!existsSync(filePath)) {
		return Error();
	}
	return mockFiles[filePath];
}

fsMock._setMockFiles = _setMockFiles;
fsMock._clearMockFiles = _clearMockFiles;
fsMock.existsSync = existsSync;
fsMock.readdirSync = readdirSync;

module.exports = fsMock;