import { useState , useLayoutEffect } from 'react';

export default function useFullscreenStatus(elRef) {
	const [isFullscreen, setIsFullscreen] = useState(
		document[getBrowserFullscreenElementProp()] != null
	);

	const setFullscreen = () => {
		if (elRef.current == null) return;

		elRef.current.requestFullscreen()
			.then(() => {
				setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
			})
			.catch(() => {
				setIsFullscreen(false);
			});
	};

	useLayoutEffect(() => {
		document.onfullscreenchange = () =>
			setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

		return () => {document.onfullscreenchange = undefined;};
	});

	return [isFullscreen, setFullscreen];
}

function getBrowserFullscreenElementProp() {
	if (typeof document.fullscreenElement !== 'undefined') {
		return 'fullscreenElement';
	} else if (typeof document.mozFullScreenElement !== 'undefined') {
		return 'mozFullScreenElement';
	} else if (typeof document.msFullscreenElement !== 'undefined') {
		return 'msFullscreenElement';
	} else if (typeof document.webkitFullscreenElement !== 'undefined') {
		return 'webkitFullscreenElement';
	} else {
		throw new Error('fullscreenElement is not supported by this browser');
	}
}

// Code sourced from: https://stackoverflow.com/questions/64485142/is-fullscreenchange-event-supported-in-react