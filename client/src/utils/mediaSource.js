// import axios from 'axios';

const URL = 'http://localhost:8080/';

export default function mediaSource(type, path) {
	// Get Video MetaData

	// Get Video Type
	const pathEncoded = encodeURIComponent(path);

	console.log(path);

	// Get all .vtt files


	// Return Endpoint (and Metadata?)

	let mediaObject = {
		'source': URL + 'stream/'+ type + '/' + pathEncoded,
		'track': URL + '/en.vtt'
	};
	return mediaObject;
}