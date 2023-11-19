const express = require('express');
const router = express.Router();
const { readdirSync } = require('fs');
const multer = require('multer');

// Upload Images using Multer
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		let path = `./static/${req.params.title}`;
		console.log('Destination:', path);
		callback(null, path);
	},
	filename: (req, file, callback) => {
		let fileExt = '.jpg';
		if (file.fieldname === 'title') fileExt = '.png';
		callback(null, file.fieldname + fileExt);
	}
});

const upload = multer({ storage: storage });

// Getting avatars
router.get('/avatars', async (req, res) => {
	const list = readdirSync('./static/_avatars', { withFileTypes: true })
		.map(dirent => dirent.name);

	let response = [];
	for (const [index, name] of list.entries()) {
		response.push({
			'id': index,
			'path': name,
		});
	}
	res.json(response);
});

// Upload Coverphotos (Poster)
router.post('/upload/coverphoto/:title', upload.single('coverphoto') , async (req, res) => {
	console.log('Uploaded coverphoto');
	res.json(200);
});

// Upload Preview
router.post('/upload/preview/:title', upload.single('preview') , async (req, res) => {
	console.log('Uploaded preview');
	res.json(200);
});

// Upload Title
router.post('/upload/title/:title', upload.single('title') , async (req, res) => {
	console.log('Uploaded title');
	res.json(200);
});


module.exports = router;