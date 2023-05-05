// import axios from 'axios';

const URL = 'http://localhost:8080/';

export default function mediaSource(endpoint) {
	// Get Video MetaData

	// Get Video Type
	console.log(endpoint);

	// Return Endpoint (and Metadata?)
	return URL + 'stream/'+endpoint;
}