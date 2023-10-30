const express = require('express');
const router = express.Router();
const ContinueWatching = require('../models/continueWatching.js');
const getUser = require('../helpers/getUser');

// Get list of Continue Watching given userId
router.get('/:id', getUser, async (req, res) => {

	// Get list from user model
	const idList = res.user.continueWatching;

	// Filter which ones are from Continue Watching
	let continueWatchingList = await ContinueWatching.find({_id: {$in: idList}});
	// Respond with list of ContinueWatchings

	// Error handling

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(continueWatchingList);
});

// Post new continue watching
router.post('/:id', getUser, async (req, res) => {
	// Add new CW
	try {
		// Delete previous CW if exist
		//get ID of previous by finding matching title with other
		let continueWatchingList = await ContinueWatching.find({_id: {$in: res.user.continueWatching}});
		const removeItem = continueWatchingList.filter((item) => item.title === req.body.title);
		if (removeItem.length !== 0) await ContinueWatching.findByIdAndRemove(removeItem[0]._id.toString());


		const continueWatching = new ContinueWatching({
			type: req.body.type,
			title: req.body.title,
			path: req.body.path,
			timestamp: req.body.timestamp,
			duration: req.body.duration
		});
		await continueWatching.save();

		// Update User's list of CW id's
		const awaitList = await ContinueWatching.find({_id: {$in: res.user.continueWatching}});
		let newList = [];
		awaitList.forEach(function (item) {
			newList.push(item._id);
		});
		newList.push(continueWatching._id);
		res.user.continueWatching = newList;
		await res.user.save();
		res.status(201).json('Successful');
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
});

// deleting a CW
router.delete('/:id/:cwid', getUser, async (req, res) => {
	try{
		const cwid = req.params.cwid;
		await ContinueWatching.findByIdAndRemove(cwid);
		console.log('Deleted CW');

		const newList = res.user.continueWatching.filter(function(id) { return id.toString() !== cwid;});
		res.user.continueWatching = newList;
		await res.user.save();
		res.status(201).json('Successful');
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
