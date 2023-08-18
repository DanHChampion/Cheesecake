import './Player.scss';
import { useRef, useEffect , useState } from 'react';
import PropTypes from 'prop-types';
import getImage from '../../utils/getImage';
import mediaSource from '../../utils/mediaSource.js';

const Player = ({ goBack }) => {
	const queryParameters = new URLSearchParams(window.location.search);
	const videoType = queryParameters.get('type');
	const videoPath = queryParameters.get('path');
	const videoTitle = videoPath.split('/')[0];

	const videoRef = useRef(null);

	const handlePlay = () => {
		videoRef.current.play();
	};
	const handlePause = () => {
		videoRef.current.pause();
	};

	const [videoSrc,setVideoSrc] = useState(null);

	useEffect(() => getVideo(), []);

	const getVideo = () => {
		setVideoSrc(mediaSource(videoType, videoPath));
	};

	return (
		<div className="Player">
			<div className='overlay'>
				<div className='header'>
					<div onClick={() => {goBack();}} className='exit'>
						X
					</div>

					<div onClick={() => {handlePlay();}}>
						Play
					</div>
					<div onClick={() => {handlePause();}}>
						Pause
					</div>
				</div>
			</div>
			<video id="video" ref={videoRef} controls autoPlay poster={getImage(videoTitle+'/preview.jpg')}>
				{videoSrc &&
				<source src={videoSrc} type='video/mp4'/>
				}
			</video>
		</div>
	);
};

export default Player;

Player.propTypes = {
	goBack: PropTypes.func.isRequired,
};
