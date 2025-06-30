const express = require('express');
const router = express.Router();
const { readdirSync } = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		let path = './static/_themes';
		console.log('Destination:', path);
		callback(null, path);
	},
	filename: (req, file, callback) => {
		console.log('File:', file);
		callback(null, file.fieldname + '.json');
	}
});

const upload = multer({ storage: storage });

/**
 * GET - Themes JSON list
 */
router.get('/', async (req, res) => {
	const themesList = readdirSync('./static/_themes', { withFileTypes: true })
		.map(dirent => dirent.name);
	let responseList = [];
	for (const [index, name] of themesList.entries()) {
		responseList.push({
			'id': index,
			'name': name.slice(0, -5), // Remove the ".json" extension
			'path': name,
		});
	}
	res.json(responseList);
});

/**
 * POST - Upload Theme JSON
 */
router.post('/upload/:name', upload.single('theme') , async (req, res) => {
	console.log('Uploaded new theme');
	res.json(200);
});


module.exports = router;
