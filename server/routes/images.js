const express = require('express');
const router = express.Router();
const { existsSync, readdirSync, mkdirSync } = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		let path = '';
		if (file.fieldname === 'avatar') {
			// ensure uploaded avatar is unique
			path = './static/_avatars';
		} else {
			path = `./static/${req.params.title}`;
			if (!existsSync(path)){
				mkdirSync(path, { recursive: true });
			}
		}
		console.log('Destination:', path);
		callback(null, path);
	},
	filename: (req, file, callback) => {
		if (file.fieldname === 'avatar') {
			// ensure uploaded avatar is unique
			const fileName = `new_avatar_${Date.now()}.png`;
			callback(null, fileName);
		} else {
			const fileExt = file.fieldname === 'title'? '.png' :'.jpg';
			callback(null, file.fieldname + fileExt);
		}
	}
});

const upload = multer({ storage: storage });

/**
 * GET - Avatar icons list
 */
router.get('/avatars', async (req, res) => {
	const avatarsList = readdirSync('./static/_avatars', { withFileTypes: true })
		.map(dirent => dirent.name);
	let responseList = [];
	for (const [index, name] of avatarsList.entries()) {
		responseList.push({
			'id': index,
			'path': name,
		});
	}
	res.json(responseList);
});

/**
 * POST - Upload Avatar Images
 */
router.post('/upload/avatar/:title', upload.single('avatar') , async (req, res) => {
	console.log('Uploaded new avatar');
	res.json(200);
});

/**
 * POST - Upload Cover-photos (Poster)
 */
router.post('/upload/coverphoto/:title', upload.single('coverphoto') , async (req, res) => {
	console.log('Uploaded coverphoto');
	res.json(200);
});

/**
 * POST - Upload Preview
 */
router.post('/upload/preview/:title', upload.single('preview') , async (req, res) => {
	console.log('Uploaded preview');
	res.json(200);
});

/**
 * POST - Upload Title Images
 */
router.post('/upload/title/:title', upload.single('title') , async (req, res) => {
	console.log('Uploaded title');
	res.json(200);
});

module.exports = router;
