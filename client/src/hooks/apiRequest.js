import axios from 'axios';

const URL = 'http://localhost:8080/';

export default function apiRequest() {
	const get = async (endpoint, callback) => {
		axios.get(URL + endpoint)
			.then(callback)
			.catch(err => {
				console.log(err);
				callback({}, err);
			});
	};

	const patch = async (endpoint, body, callback) => {
		axios.patch(URL + endpoint, body)
			.then(callback)
			.catch(err => {
				console.log(err);
				callback({}, err);
			});
	};

	const post = async (endpoint, body, callback) => {
		axios.post(URL + endpoint, body)
			.then(callback)
			.catch(err => {
				if(!err) return;
				console.error(err);
				callback({}, err);
			});
	};

	const _delete = async (endpoint, callback) => {
		axios.delete(URL + endpoint)
			.then(callback)
			.catch(err => {
				if(!err) return;
				console.error(err);
				callback({}, err);
			});
	};

	return {
		get: get,
		patch: patch,
		post: post,
		delete: _delete
	};
}