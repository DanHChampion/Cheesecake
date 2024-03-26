const express = require('express');
const router = express.Router();
const Watchlist = require('../models/watchlist.js');
const getUser = require('../helpers/getUser');

/**
 * GET - Watchlist of a user
 */
router.get('/:id', getUser, async (req, res) => {
	const idList = res.user.watchlist;
	const watchlist = await Watchlist.find({_id: {$in: idList}});
	// TO DO: Error handling
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(watchlist);
});

/**
 * POST - Add new item to user's Watchlist
 */
router.post('/:id', getUser, async (req, res) => {
	// Validate REQ.BODY
	// Check if watchlist already exist
	let currentWatchlist = await Watchlist.find({_id: {$in: res.user.watchlist}});
	const inList = currentWatchlist.filter((item) => item.title === req.body.title);
	if (inList.length !== 0) {
		return res.status(403).json('Already in list').send();
	}
	const watchlist = new Watchlist({
		type: req.body.type,
		title: req.body.title,
		path: req.body.path
	});
	await watchlist.save();

	// Update User's list of watchlist id's
	const userWatchlistIds = await Watchlist.find({_id: {$in: res.user.watchlist}});
	let newWatchlistIds = [];
	userWatchlistIds.forEach(function (item) {
		newWatchlistIds.push(item._id);
	});
	newWatchlistIds.push(watchlist._id);
	res.user.watchlist = newWatchlistIds;
	await res.user.save();

	res.status(201).json(watchlist);
});

/**
 * DELETE - Item from user's Watchlist given Item Id
 */
router.delete('/:id/:wid', getUser, async (req, res) => {
	// Validate REQ.BODY
	const wid = req.params.wid;
	await Watchlist.findByIdAndRemove(wid);
	console.log('Deleted WL');

	const newWatchlistIds = res.user.watchlist.filter(function(id) { return id.toString() !== wid;});
	res.user.watchlist = newWatchlistIds;
	await res.user.save();
	res.status(201).json('Successful');
});


module.exports = router;
