const express = require('express');
const router = express.Router();
const ContinueWatching = require('../models/continueWatching.js');
const getUser = require('../helpers/getUser');

/**
 * GET - Continue Watching List
 */
router.get('/:id', getUser, async (req, res) => {
	const idList = res.user.continueWatching;
	const continueWatchingList = await ContinueWatching.find({_id: {$in: idList}});
	// TO DO: Error handling
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(continueWatchingList);
});

/**
 * POST - Add another item to Continue Watching List
 */
router.post('/:id', getUser, async (req, res) => {
	try {
		// Delete previous CW if exist
		// get ID of previous by finding matching title with other
		let continueWatchingList = await ContinueWatching.find({_id: {$in: res.user.continueWatching}});
		const removeItem = continueWatchingList.filter((item) => item.title === req.body.title);
		if (removeItem.length !== 0) await ContinueWatching.findByIdAndRemove(removeItem[0]._id.toString());
		// TO DO: Error handling

		const continueWatching = new ContinueWatching({
			type: req.body.type,
			title: req.body.title,
			path: req.body.path,
			timestamp: req.body.timestamp,
			duration: req.body.duration
		});
		await continueWatching.save();
		// TO DO: Error handling
		const awaitList = await ContinueWatching.find({_id: {$in: res.user.continueWatching}});
		// TO DO: Error handling

		let newList = [];
		awaitList.forEach(function (item) {
			newList.push(item._id);
		});
		newList.push(continueWatching._id);

		res.user.continueWatching = newList;
		await res.user.save();
		// TO DO: Error handling
		res.status(201).json('Successful');
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
});

/**
 * DELETE - An item from Continue Watching List
 */
router.delete('/:id/:cwid', getUser, async (req, res) => {
	try{
		const cwid = req.params.cwid;
		await ContinueWatching.findByIdAndRemove(cwid);
		// TO DO: Error handling
		console.log('Deleted CW');

		const newList = res.user.continueWatching.filter(function(id) { return id.toString() !== cwid;});
		res.user.continueWatching = newList;
		await res.user.save();
		// TO DO: Error handling
		res.status(201).json('Successful');
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
