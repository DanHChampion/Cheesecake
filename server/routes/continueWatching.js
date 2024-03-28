const express = require('express');
const router = express.Router();
const ContinueWatching = require('../models/continueWatching');
const getUser = require('../helpers/getUser');
const createContinueWatching = require('../helpers/createContinueWatching');

/**
 * GET - Continue Watching List
 */
router.get('/:id', getUser, async (req, res) => {
	try {
		const continueWatchingList = await ContinueWatching.find({userId: res.user._id});
		res.json(continueWatchingList);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * POST - Add another item to Continue Watching List
 */
router.post('/:id', getUser, async (req, res) => {
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
	// Validate REQ.BODY
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
