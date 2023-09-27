import './Player.scss';
import apiRequest from '../../hooks/apiRequest';
import { useRef, useEffect , useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import getImage from '../../utils/getImage';
import mediaSource from '../../utils/mediaSource.js';
import convertHMS from '../../utils/convertHMS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClosedCaptioning, faExpand, faMinimize, faPause, faPlay, faRotateForward, faRotateBackward, faChevronLeft, faForwardStep } from '@fortawesome/free-solid-svg-icons';

const Player = ({ goBack }) => {
	const queryParameters = new URLSearchParams(window.location.search);
	const videoType = queryParameters.get('type');
	const videoPath = queryParameters.get('path');
	const videoTitle= videoPath.split('/')[0];

	const [paused,setPaused] = useState(false);
	const [fullScreen,setFullScreen] = useState(false);
	const [subtitles,setSubtitle] = useState(false);
	const [slider, setSlider] = useState(0);
	const [nextEpisode,setNextEpisode] = useState(null);

	const videoRef = useRef(null);
	const sliderRef = useRef(null);
	const bodyRef = useRef(null);

	const handleKeyPress = useCallback((event) => {
		console.log(`Key pressed: ${event.key}`);
		if (event.key == 'f') {
			toggleFullScreen();
		}
		if (event.key == ' ' || event.key == 'k') {
			handlePause();
		}
		if (event.key == 'j' || event.key === 'ArrowLeft') {
			handleSkip(-10);
		}
		if (event.key == 'l' || event.key === 'ArrowRight') {
			handleSkip(10);
		}
		if (event.key == 'Escape'){
			goBack();
		}
	}, [paused]);

	useEffect(() => {
		// attach the event listener
		document.addEventListener('keydown', handleKeyPress);
		// remove the event listener
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	const updateTimestamp = () => {
		if (sliderRef.current.value <= 0) sliderRef.current.value = 0;
		else if ((sliderRef.current.value >= sliderRef.current.max)) sliderRef.current.max-0.1;
		setSlider(sliderRef.current.value);
		const newTimestamp = sliderRef.current.value;
		videoRef.current.currentTime = newTimestamp;
		updateSlider();
	};

	const updateSlider = () => {
		setSlider(videoRef.current.currentTime);
		sliderRef.current.style.backgroundSize = (sliderRef.current.value * 100)/ sliderRef.current.max + '% 100%';
	};

	const handleSkip = (value) => {
		const newTimestamp = videoRef.current.currentTime + value;
		if (newTimestamp <= 0) {videoRef.current.currentTime = 0.1;}
		else if (newTimestamp >= videoRef.current.duration) {videoRef.current.currentTime = videoRef.current.duration;}
		else {videoRef.current.currentTime = newTimestamp;}
		updateSlider();
	};

	const handlePause = () => {
		if (paused){
			videoRef.current.play();
		} else{
			videoRef.current.pause();
		}
		setPaused(!paused);
	};

	// Need to consider when using 'ESC' to exit fullscreen
	const toggleFullScreen = () => {
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

	useEffect(() => getNextEpisode(), []);

	const getNextEpisode = () => {
		apiRequest().get( 'videos/'+videoType+'/'+videoPath, (res, err) => {
			console.log(res);
			if (res.data == null) {
				setNextEpisode(undefined);
			}
			else if(!err && res !== null) {
				setNextEpisode(res.data);
			}
		});
	};

	// Run Slide Loop
	useEffect(() => {
		updateSlider();
		sliderRef.current.max = videoRef.current.duration;
		const interval = setInterval(() => {
			updateSlider();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [slider]
	);

	const getVideo = () => {
		setVideoSrc(mediaSource(videoType, videoPath));
	};

	const time = () => {
		return convertHMS(slider) + ' / ' + convertHMS(sliderRef.current.max - slider);
	};

	return (
		<div className="Player">
			<div className='overlay' ref={bodyRef}>
				<div onClick={() => {handlePause();}} className='clickable-screen'></div>
				<div className='header'>
					<div onClick={() => {goBack();}} className='exit'>
						<FontAwesomeIcon className='icon' icon={faChevronLeft}/> {videoPath.split('/')[videoPath.split('/').length-1].split('.mp4')[0]}
					</div>
				</div>
				<div className='slider'>
					<input onChange={() => {updateTimestamp();}} ref={sliderRef} type='range' min='0.1' value={slider} max='1000' />
				</div>
				<div className='controls'>
					<button onClick={() => {toggleSubtitles();}}>
						<FontAwesomeIcon icon={faClosedCaptioning}/>
					</button>
					<button onClick={() => {handleSkip(-10);}}>
						<FontAwesomeIcon icon={faRotateBackward}/>
					</button>
					<button onClick={() => {handlePause();}}>
						<FontAwesomeIcon icon={!paused? faPause : faPlay}/>
					</button>
					<button onClick={() => {handleSkip(10);}}>
						<FontAwesomeIcon icon={faRotateForward}/>
					</button>
					<button onClick={() => {toggleFullScreen();}}>
						<FontAwesomeIcon icon={!fullScreen? faExpand : faMinimize}/>
					</button>
					{nextEpisode !== undefined &&
					<button className='next-episode'>
						<a href={'/watch/?type=' + videoType +'&path=' + encodeURIComponent(videoTitle+'/'+nextEpisode)}>
							<FontAwesomeIcon icon={faForwardStep}/>
						</a>
					</button>
					}
					{slider !== 0 &&
						<div className='time'>
							{time()}
						</div>
					}
				</div>
			</div>
			<video id="video" ref={videoRef} autoPlay poster={getImage(videoTitle+'/preview.jpg')}>
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
