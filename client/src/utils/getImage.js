const URL = process.env.REACT_APP_BACKEND_URL;

export default function getImage(path) {
	// Return Link
	return URL +path;
}