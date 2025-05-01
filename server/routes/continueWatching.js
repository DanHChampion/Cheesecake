const express = require('express');
const router = express.Router();
const ContinueWatching = require('../models/continueWatching');
const getUser = require('../helpers/getUser');
const createContinueWatching = require('../helpers/createContinueWatching');
const hasContent = require('../helpers/hasContent');
const { existsSync } = require('fs');
const getMediaFiles = require('../helpers/getMediaFiles');
const getDirectories = require('../helpers/getDirectories');

const videoDir = process.env.VIDEODIR? process.env.VIDEODIR : './videos';

/**
 * GET - Continue Watching List
 */
router.get('/:id', getUser, async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: 'Bad formatting' });
	}
	// check if any videos are available
	if (!(await hasContent())) {
		return res.status(404).json({ message: 'No content available' });
	}
	try {
		const continueWatchingList = await ContinueWatching.find({userId: res.user._id});
		res.json(continueWatchingList);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * GET - Continue watching based on title
 */
router.get('/:id/:title', getUser ,async (req, res) => {
	const title = req.params.title;
	let type = null;
	let basePath = null;

	// Check if the title exists in Series or Movies
	if (existsSync(`${videoDir}/Series/${title}`)) {
		type = 'series';
		let validDirectories = await getDirectories(videoDir+'/Series/'+title);
		if (validDirectories[0] !== undefined) {
			let validFiles = await getMediaFiles(videoDir+'/Series/'+title+'/'+validDirectories[0]);
			if (validFiles[0] !== undefined) {
				basePath = `${title}/${validDirectories[0]}/${validFiles[0]}`;
			}
		}
	} else if (existsSync(`${videoDir}/Movies/${title}`)) {
		type = 'movie';
		let validFiles = await getMediaFiles(videoDir+'/Movies/'+title);
		if (validFiles[0] !== undefined) {
			basePath = `${title}/${validFiles[0]}`;
		}
	} else {
		return res.status(404).send();
	}

	try {
		// Find the title in the continue watching list
		const continueWatchingList = await ContinueWatching.find({ userId: res.user._id });
		const item = continueWatchingList.find(entry => entry.title === title);

		if (item) {
			return res.json(item); // Return the continue watching object if it exists
		} else {
			// If no continue watching exists, return a default JSON object
			if (!basePath) {
				return res.status(404).json({ message: 'No content available' });
			}
			return res.json({
				id: null,
				userId: res.user._id,
				title: title,
				type: type,
				path: basePath,
				timestamp: null,
				duration: null
			});
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ message: err.message });
	}
});

/**
 * POST - Add another item to Continue Watching List
 */
router.post('/:id', getUser, async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: 'Bad formatting' });
	}
	try {
		const currentContinueWatching = await ContinueWatching.find({userId: res.user._id});
		if (req.body.title !== undefined) {
			currentContinueWatching.forEach(async (item) => {
				if (item.title === req.body.title) {
					await ContinueWatching.findByIdAndRemove(item._id);
				}
			});
		}
		const continueWatching = await createContinueWatching(res.user, req.body);
		res.status(201).json(continueWatching);
	}
	catch (err) {
		if (err.message == 'Bad formatting') {
			return res.status(400).json({ message: err.message });
		}
		res.status(500).json({ message: err.message });
	}
});

/**
 * DELETE - An item from Continue Watching List
 */
router.delete('/:id/:cwid', getUser, async (req, res) => {
	if (!req.params.id || !req.params.cwid) {
		return res.status(400).json({ message: 'Bad formatting' });
	}
	// validate if req.body
	try {
		const userContinueWatching = await ContinueWatching.find({userId: res.user._id});
		const cwid = req.params.cwid;
		if (!userContinueWatching.some(item => item._id.toString() === cwid)){
			return res.status(404).json({ message: 'This user does not have this Continue Watching item'});
		}
		await ContinueWatching.findByIdAndRemove(cwid);
		res.status(201).json({ message: 'Successfully Deleted' });
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
