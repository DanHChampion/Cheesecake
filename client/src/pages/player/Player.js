import './Player.css';
import { useEffect , useState } from 'react';
import videoSource from '../hooks/videoSource.js';

const Player = () => {
	const queryParameters = new URLSearchParams(window.location.search);
	const videoId = queryParameters.get('id');

	const [videoSrc,setVideoSrc] = useState(null);

	useEffect(() => getVideo(), []);

	const getVideo = () => {
		setVideoSrc(videoSource(videoId));
	};

	return (
		<div className="Player">
			<video id="video" controls autoPlay muted>
				{videoSrc &&
				<source src={videoSrc} type='video/mp4'/>
				}
			</video>
		</div>
	);
};

export default Player;
