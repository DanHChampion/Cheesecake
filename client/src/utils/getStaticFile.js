const URL = import.meta.env.VITE_BACKEND_URL;

export default function getStaticFile(path) {
	// Return Link
	return URL +path;
}