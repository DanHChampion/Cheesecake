import './Player.scss';
import { useRef, useEffect , useState } from 'react';
import PropTypes from 'prop-types';
import getImage from '../../utils/getImage';
import mediaSource from '../../utils/mediaSource.js';

const Player = ({ goBack }) => {
	const queryParameters = new URLSearchParams(window.location.search);
	const videoType = queryParameters.get('type');
	const videoPath = queryParameters.get('path');
	const videoTitle= videoPath.split('/')[0];

	const [fullScreen,setFullScreen] = useState(false);
	const [subtitles,setSubtitle] = useState(false);


	const videoRef = useRef(null);
	const bodyRef = useRef(null);

	const handlePlay = () => {
		videoRef.current.play();
	};
	const handlePause = () => {
		videoRef.current.pause();
	};

	// Need to consider when using 'ESC' to exit fullscreen
	const toggleFullScreen = () => {
		console.log('FS:',fullScreen);
		if (document.fullscreenElement === null) {
			document.body.requestFullscreen();
			setFullScreen(true);
		}
		else {
			document.exitFullscreen();
			setFullScreen(false);
		}
	};

	const toggleSubtitles = () => {
		setSubtitle(!subtitles);
		console.log('SUB:',subtitles);
	};

	const [videoSrc,setVideoSrc] = useState(null);

	useEffect(() => getVideo(), []);

	const getVideo = () => {
		setVideoSrc(mediaSource(videoType, videoPath));
	};

	return (
		<div className="Player">
			<div className='overlay' ref={bodyRef}>
				<div className='header'>
					<div>
						{videoPath.split('/')[videoPath.split('/').length-1].split('.mp4')[0]}
					</div>
					<div onClick={() => {goBack();}} className='exit'>
						X
					</div>
				</div>
				<div>
					{/* MIDDLE BUTTONS HERE */}
				</div>
				<div className='controls'>
					<button onClick={() => {handlePlay();}}>
						Play
					</button>
					<button onClick={() => {handlePause();}}>
						Pause
					</button>
					<button onClick={() => {toggleSubtitles();}}>
						ToggleSub
					</button>
					<button onClick={() => {toggleFullScreen();}}>
						{!fullScreen? 'Expand':'Shrink'}
					</button>
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
