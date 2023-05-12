// import axios from 'axios';

const URL = 'http://localhost:8080/';

export default function mediaSource(type, path) {
	// Get Video MetaData

	// Get Video Type
	const pathEncoded = encodeURIComponent(path);


	// Return Endpoint (and Metadata?)
	return URL + 'stream/'+ type + '/' + pathEncoded;
}