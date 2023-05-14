import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function apiRequest() {
	const get = async (endpoint, callback) => {
		axios.get(BACKEND_URL + endpoint)
			.then(callback)
			.catch(err => {
				console.log(err);
				callback({}, err);
			});
	};

	const patch = async (endpoint, body, callback) => {
		axios.patch(BACKEND_URL + endpoint, body)
			.then(callback)
			.catch(err => {
				console.log(err);
				callback({}, err);
			});
	};

	const post = async (endpoint, body, callback) => {
		axios.post(BACKEND_URL + endpoint, body)
			.then(callback)
			.catch(err => {
				if(!err) return;
				console.error(err);
				callback({}, err);
			});
	};

	const _delete = async (endpoint, callback) => {
		axios.delete(BACKEND_URL + endpoint)
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