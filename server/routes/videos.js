require('dotenv').config();
const express = require('express');
const router = express.Router();
const { existsSync } = require('fs');
const getMediaFiles = require('../helpers/getMediaFiles');
const getDirectories = require('../helpers/getDirectories');
const videoDir = process.env.VIDEODIR? process.env.VIDEODIR : './videos';
console.log('Video Directory:',videoDir);

/**
 * GET - All Movies
 */
router.get('/movies', async (req, res) => {
	if (!existsSync(videoDir+'/Movies')) {
		return res.status(404).send();
	}
	const moviesList = await getDirectories(videoDir+'/Movies');
	let response = [];
	for (const [index, name] of moviesList.entries()) {
		let validFiles = await getMediaFiles(videoDir+'/Movies/'+name);
		if (validFiles[0] !== undefined) {
			response.push({
				'_id': index,
				'title': name,
				'type':'movie',
				'path': `${name}/${validFiles[0]}`,
			});
		}
	}
	res.json(response);
});

/**
 * GET - All Series
 */
router.get('/series', async (req, res) => {
	if (!existsSync(videoDir+'/Series')) {
		return res.status(404).send();
	}
	const seriesList = await getDirectories(videoDir+'/Series');
	let response = [];
	for (const [index, name] of seriesList.entries()) {
		let validDirectories = await getDirectories(videoDir+'/Series/'+name);
		if (validDirectories[0] !== undefined) {
			response.push({
				'_id': index,
				'title': name,
				'type':'series',
				'path': name,
			});
		}
	}
	res.json(response);
});

/**
 * GET - All Seasons of given Series
 */
router.get('/series/seasons/:title', async (req, res) => {
	if (!existsSync(videoDir+'/Series/'+req.params.title)) {
		return res.status(404).send();
	}
	const seasons = await getDirectories(videoDir+'/Series/'+req.params.title, true);
	res.json(seasons);
});

/**
 * GET - All Episodes in a Season
 */
router.get('/series/:title/:season', async (req, res) => {
	const season = req.params.season;
	const title = req.params.title;
	if (!existsSync(videoDir+'/Series/'+title+'/'+season)) {
		return res.status(404).send();
	}
	const episodeList = await getMediaFiles(videoDir+'/Series/'+title+'/'+season, true);

	let response = [];
	for (const [index, name] of episodeList.entries()) {
		const epTitle = name.replace(/\.[^/.]+$/, '');
		response.push({
			'episode': index+1,
			'title': epTitle,
			'path': `${title}/${season}/${name}`,
		});
	}
	res.json(response);
});

/**
 * GET - Getting Next Episode based on given Episode
 */
router.get('/series/:title/:season/:episode', async (req, res) => {
	const season = req.params.season;
	const title = req.params.title;
	const episode = req.params.episode;
	if (!existsSync(videoDir+'/Series/'+title+'/'+season+'/'+episode)) {
		return res.status(404).send();
	}
	const episodeList = await getMediaFiles(videoDir+'/Series/'+title+'/'+season, true);
	const currentEpisodeIndex = episodeList.findIndex(name => name === episode);
	const nextEpisode = episodeList[currentEpisodeIndex + 1];
	if (nextEpisode !== undefined) {
		return res.json(`${season}/${nextEpisode}`);
	}
	// Check if another season exists
	const seasons = await getDirectories(videoDir+'/Series/'+req.params.title, true);
	const currentSeasonIndex = seasons.findIndex(name => name === season);
	const nextSeason = seasons[currentSeasonIndex + 1];
	if (nextSeason !== undefined) {
		const nextSeasonEpisodeList = await getMediaFiles(videoDir+'/Series/'+title+'/'+nextSeason, true);
		const firstEpisodeOfNextSeason = nextSeasonEpisodeList[0];
		return res.json(`${nextSeason}/${firstEpisodeOfNextSeason}`);
	}
	return res.json(null);
});

/**
 * GET - All Videos (Movies + Series)
 */
router.get('/all', async (req, res) => {
	let response = [];
	let index = 0;
	if (existsSync(videoDir+'/Movies')) {
		const moviesList = await getDirectories(videoDir+'/Movies');
		for (const movieTitle of moviesList) {
			let validFiles = await getMediaFiles(videoDir+'/Movies/'+movieTitle);
			if (validFiles[0] !== undefined) {
				response.push({
					'_id': index++,
					'title': movieTitle,
					'type':'movie',
					'path': `${movieTitle}/${validFiles[0]}`,
				});
			}
		}
	}
	if (existsSync(videoDir+'/Series')) {
		const seriesList = await getDirectories(videoDir+'/Series');
		for (const seriesTitle of seriesList) {
			let validDirectories = await getDirectories(videoDir+'/Series/'+seriesTitle);
			if (validDirectories[0] !== undefined) {
				response.push({
					'_id': index++,
					'title': seriesTitle,
					'type':'series',
					'path': seriesTitle,
				});
			}
		}
	}
	if (response.length === 0) {
		return res.status(404).send();
	}
	res.json(response);
});

module.exports = router;