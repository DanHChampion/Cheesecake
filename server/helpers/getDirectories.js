const { readdirSync } = require('fs');

async function getDirectories(path, sorted = false) {
	let directories = (await readdirSync(path, { withFileTypes: true }))
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);
	if (sorted) {
		directories.sort();
	}
	return directories;
}

module.exports = getDirectories;