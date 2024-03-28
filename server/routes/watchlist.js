const express = require('express');
const router = express.Router();
const Watchlist = require('../models/watchlist');
const getUser = require('../helpers/getUser');
const createWatchlist = require('../helpers/createWatchlist');

/**
 * GET - Watchlist of a user
 */
router.get('/:id', getUser, async (req, res) => {
	try {
		const watchlist = await Watchlist.find({userId: res.user._id});
		res.json(watchlist);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * POST - Add new item to user's Watchlist
 */
router.post('/:id', getUser, async (req, res) => {
	try {
		const currentWatchlist = await Watchlist.find({userId: res.user._id});
		const checkList = currentWatchlist.filter((item) => item.title === req.body.title);
		if (checkList.length !== 0) {
			return res.status(403).json({ message: 'Already in list' });
		}
		const watchlist = await createWatchlist(res.user, req.body);
		res.status(201).json(watchlist);
	}
	catch (err) {
		if (err.message == 'Bad formatting') {
			return res.status(400).json({ message: err.message });
		}
		res.status(500).json({ message: err.message });
	}
});

/**
 * DELETE - Item from user's Watchlist given Item Id
 */
router.delete('/:id/:wid', getUser, async (req, res) => {
	// Validate REQ.BODY
	try {
		const userWatchlist = await Watchlist.find({userId: res.user._id});
		const wid = req.params.wid;
		console.log(userWatchlist);
		if (!userWatchlist.some(item => item._id.toString() === wid)){
			return res.status(404).json({ message: 'This user does not have this watchlist item'});
		}
		await Watchlist.findByIdAndRemove(wid);
		res.status(201).json({ message: 'Successfully Deleted' });
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
});


module.exports = router;
