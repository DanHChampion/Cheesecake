const { existsSync } = require('fs');
const getDirectories = require('./getDirectories');
const getMediaFiles = require('./getMediaFiles');

const videoDir = process.env.VIDEODIR ? process.env.VIDEODIR : './videos';

// Look for any content in the Movies and Series directories
async function hasContent() {
	if (existsSync(`${videoDir}/Movies`)) {
		const moviesList = await getDirectories(`${videoDir}/Movies`);
		for (const movieTitle of moviesList) {
			const validFiles = await getMediaFiles(`${videoDir}/Movies/${movieTitle}`);
			if (validFiles.length > 0) {
				return true;
			}
		}
	}

	if (existsSync(`${videoDir}/Series`)) {
		const seriesList = await getDirectories(`${videoDir}/Series`);
		for (const seriesTitle of seriesList) {
			const validDirectories = await getDirectories(`${videoDir}/Series/${seriesTitle}`);
			if (validDirectories.length > 0) {
				return true;
			}
		}
	}

	return false;
}

module.exports = hasContent;