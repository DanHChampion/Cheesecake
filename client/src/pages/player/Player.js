import './Player.scss';
import apiRequest from '../../hooks/apiRequest';
import { useRef, useEffect , useState, useCallback } from 'react';
import useFullscreenStatus from '../../hooks/useFullscreenStatus';
// import PropTypes from 'prop-types';
import getImage from '../../utils/getImage';
import mediaSource from '../../utils/mediaSource.js';
import convertHMS from '../../utils/convertHMS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClosedCaptioning, faExpand, faMinimize, faPause, faPlay, faRotateForward, faRotateBackward, faChevronLeft, faForwardStep } from '@fortawesome/free-solid-svg-icons';

const Player = () => {
	const queryParameters = new URLSearchParams(window.location.search);
	const videoType = queryParameters.get('type');
	const videoPath = queryParameters.get('path');
	const videoStartTime = queryParameters.get('start')? parseFloat(queryParameters.get('start')) : 0;
	const videoTitle= videoPath.split('/')[0];

	const [paused,setPaused] = useState(false);
	const [seekValue,setSeekValue] = useState(0);
	const [subtitles,setSubtitle] = useState(false);
	// const [videoSub,setVideoSub] = useState(null);
	const [slider, setSlider] = useState(0);
	const [nextEpisode,setNextEpisode] = useState(null);

	const videoRef = useRef(null);
	const sliderRef = useRef(null);
	const bodyRef = useRef(null);
	const seekerRef = useRef(null);

	let fullScreen, setFullScreen;

	try {
		[fullScreen, setFullScreen] = useFullscreenStatus(bodyRef);
	} catch (e) {
		console.log('Fullscreen not supported');
		fullScreen = false;
		setFullScreen = undefined;
	}

	const getUserObject = () => {
		return JSON.parse(localStorage.getItem('userObject'));
	};

	useEffect(() => {
		setUserObject(getUserObject());
	},[]);

	const [userObject,setUserObject] = useState(getUserObject());


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
	}, [paused]);

	useEffect(() => {
		// attach the event listener
		document.addEventListener('keydown', handleKeyPress);
		// remove the event listener
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	useEffect(() => {
		let timeout = 0;

		const mouseMove = (event) => {
			bodyRef.current.style.opacity = 1;
			bodyRef.current.style.cursor = 'default';

			clearTimeout(timeout);

			// Seeking
			if (event.target.id === 'timeline'){
				seek(event);
			}

			timeout = setTimeout(() => {
				bodyRef.current.style.opacity = 0;
				bodyRef.current.style.cursor = 'none';
			}, 2000);
		};

		bodyRef.current.addEventListener('mousemove', mouseMove);

		return () => {
			bodyRef.current.removeEventListener('mousemove', mouseMove);
		};
	}, []);
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

	const toggleFullScreen = (exitOnly = false) => {
		if (exitOnly === false && document.fullscreenElement === null) {
			document.body.requestFullscreen();
			setFullScreen(true);
		}
		else if (document.fullscreenElement !== null){
			document.exitFullscreen();
			setFullScreen(false);
		}
	};

	const toggleSubtitles = () => {
		setSubtitle(!subtitles);
		console.log('SUB:',subtitles);
	};

	const updateContinueWatching = () => {
		const body = {
			'type': videoType,
			'title': videoTitle,
			'path': videoPath,
			'timestamp': videoRef.current.currentTime,
			'duration': videoRef.current.duration
		};
		apiRequest().post('continuewatching/'+ userObject._id, body, {}, (res, err) => {
			if(!err) {
				console.log(res.status);
			} else {
				console.error(err);
			}
		});
	};

	const [videoSrc,setVideoSrc] = useState(null);

	useEffect(() => {getVideo(); handleSkip(videoStartTime);}, []);

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
			updateContinueWatching();
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
		if (isNaN(sliderRef.current.max)) {
			return '';
		}
		return convertHMS(sliderRef.current.max - slider);
		// return convertHMS(slider) + ' / ' + convertHMS(sliderRef.current.max - slider);
	};

	// Timeline Tracker
	const seek = (e) => {
		// Get width of slider
		// get mouseX position
		const sliderRect = e.target.getBoundingClientRect();
		let x = e.clientX - sliderRect.left;
		if (x < 0) x = 0;
		setSeekValue(x);
		// find time/value of slider
		// const = duration * left/;
		// Style left: to that position
		// Update time
	};

	return (
		<div className="Player">
			<div className='overlay' ref={bodyRef}>
				<div onClick={() => {handlePause();}} className='clickable-screen'></div>
				<div className='header'>
					<div onClick={() => {toggleFullScreen(true);}} className='exit'>
						<a href='/home'>
							<FontAwesomeIcon className='icon' icon={faChevronLeft}/> {videoPath.split('/')[videoPath.split('/').length-1].split('.mp4')[0]}
						</a>
					</div>
				</div>
				<div className='slider'>
					<input id='timeline' onChange={() => {updateTimestamp();}} ref={sliderRef} type='range' min='0.1' value={slider} max='1000000' />
					{slider !== 0 &&
						<div className='seeker' style={{left:seekValue}} ref={seekerRef}>
							<div className='thumbnail-container'>
								<img/>
								<p>{convertHMS((seekValue/sliderRef.current.offsetWidth)*videoRef.current.duration)}</p>
							</div>
						</div>
					}
					{slider !== 0 &&
						<div className='time'>
							{time()}
						</div>
					}
				</div>
				<div className='controls'>
					{/* <input type='file' onChange={(e) => {
						setVideoSub(e.target.files[0]);
						console.log(e.target.files[0]);
					} */}
					{/* }/> */}
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
				</div>
			</div>
			<video id="video" crossOrigin="anonymous" ref={videoRef} autoPlay poster={getImage(videoTitle+'/preview.jpg')}>
				{videoSrc &&<>
					<source src={videoSrc.source} type='video/mp4'/>
					<track
						src={videoSrc.track}
						default
					/>
				</>
				}
				{/* {(videoSub && subtitles) && */}
				{/* } */}
			</video>
		</div>
	);
};

export default Player;

// Player.propTypes = {
// 	navigateTo: PropTypes.func.isRequired,
// };
