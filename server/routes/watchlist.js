const express = require('express');
const router = express.Router();
const Watchlist = require('../models/watchlist.js');
const getUser = require('../helpers/getUser');

// Get all watchlists given userId
router.get('/:id', getUser, async (req, res) => {

	// Get list from user model
	const idList = res.user.watchlist;

	// Filter which ones are from Watchlist
	let watchlistList = await Watchlist.find({_id: {$in: idList}});
	// Respond with list of Watchlists

	// Error handling

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(watchlistList);
});

// Post new watchlist item
router.post('/:id', getUser, async (req, res) => {
	try {
		// Check if watchlist already exist
		let watchlistList = await Watchlist.find({_id: {$in: res.user.watchlist}});
		const inList = watchlistList.filter((item) => item.title === req.body.title);
		if (inList.length !== 0) {
			res.status(403).json('Already in list');
			return;
		}

		const watchlist = new Watchlist({
			type: req.body.type,
			title: req.body.title,
			path: req.body.path
		});
		await watchlist.save();


		// Update User's list of watchlist id's
		const awaitList = await Watchlist.find({_id: {$in: res.user.watchlist}});
		let newList = [];
		awaitList.forEach(function (item) {
			newList.push(item._id);
		});
		newList.push(watchlist._id);
		res.user.watchlist = newList;
		await res.user.save();

		res.status(201).json(watchlist);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
});

router.delete('/:id/:wid', getUser, async (req, res) => {
	try{
		const wid = req.params.wid;
		await Watchlist.findByIdAndRemove(wid);
		console.log('Deleted WL');

		const newList = res.user.watchlist.filter(function(id) { return id.toString() !== wid;});
		res.user.watchlist = newList;
		await res.user.save();
		res.status(201).json('Successful');
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
});


module.exports = router;
