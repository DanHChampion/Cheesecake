const URL = import.meta.env.VITE_BACKEND_URL;

export default function getImage(path) {
	// Return Link
	return URL +path;
}