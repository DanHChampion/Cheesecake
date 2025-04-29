import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const USE_API = import.meta.env.VITE_USE_TMDB_API;

export default function tmdbApi() {

	const get = async (endpoint, callback) => {
		if (USE_API === 'false') return;
		axios.get(URL + endpoint + 'api_key=' + API_KEY)
			.then(callback)
			.catch(err => {
				console.log(err);
				callback({}, err);
			});
	};

	return {
		get: get
	};
}