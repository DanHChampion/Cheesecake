import './Player.scss';
import { useEffect , useState } from 'react';
import mediaSource from '../../utils/mediaSource.js';

const Player = () => {
	const queryParameters = new URLSearchParams(window.location.search);
	const videoType = queryParameters.get('type');
	const videoPath = queryParameters.get('path');

	const [videoSrc,setVideoSrc] = useState(null);

	useEffect(() => getVideo(), []);

	const getVideo = () => {
		setVideoSrc(mediaSource(videoType+'/'+videoPath));
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
