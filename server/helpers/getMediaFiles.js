const { readdirSync } = require('fs');

async function getMediaFiles(path, sorted = false) {
	const SUPPORTED_VIDEO_FILES = ['mp4', 'mkv'];
	let files = (await readdirSync(path, { withFileTypes: true }))
		.map(dirent => dirent.name)
		.filter(file => SUPPORTED_VIDEO_FILES.some(ext => file.endsWith(ext)));
	if (sorted) {
		files.sort();
	}
	return files;
}

module.exports = getMediaFiles;