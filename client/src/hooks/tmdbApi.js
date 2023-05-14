import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function tmdbApi() {

	const get = async (endpoint, callback) => {
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