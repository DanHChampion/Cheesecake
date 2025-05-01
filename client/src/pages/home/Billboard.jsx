import './Billboard.scss';
import getImage from '../../utils/getImage.js';
import apiRequest from '../../hooks/apiRequest.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect , useState } from 'react';
import PropTypes from 'prop-types';


const Billboard = ({previewObj}) => {

	const getUserObject = () => {
		return JSON.parse(localStorage.getItem('userObject'));
	};

	const [item,setItem] = useState(null);
	const [missingTitleImage, setMissingTitleImage] = useState(null);
	const [noVideos, setNoVideos] = useState(false);

	useEffect(() => {
		getRandomItem();
	}, []);

	const getRandomItem = () => {
		apiRequest().get('videos/random', (res, err) => {
			if(!err) {
				// Pick random one
				setItem(res.data);
				console.log(res.data);
				getContinueWatching(res.data)
			} else if (err.response.status === 404) {
				console.log('No items found!');
				setNoVideos(true);
			}
		});
	};

	const getContinueWatching = (item) => {
		const userObject = getUserObject();
		apiRequest().get(`continuewatching/${userObject._id}/${item.title}`, (res, err) => {
			if(!err) {
				setItem(res.data);
			}
		});
	};

	return(
		<div className="Billboard">
			{noVideos &&
				<div className='no-videos'>
					<h1>No videos found!</h1>
					<p>Try adding some videos to your library or check your configuration.</p>
				</div>
			}
			{item && !noVideos &&
				<div className='img-wrapper'>
					<img className='poster' src={getImage(item.title+'/preview.jpg')} alt={item.title +' Poster'} onError={(e) => e.target.style.display = 'none'}/>
					<div className='details-container'>
						<img src={getImage(item.title+'/title.png')} alt={item.title +' Title'} onError={(e) => {e.target.style.display = 'none'; setMissingTitleImage(true);}}/>
						{missingTitleImage && <h1>{item.title}</h1>}
						<div className='button-container'>
							<a href={'/watch/?type=' + item.type +'&path=' + encodeURIComponent(item.path) + (item.timestamp? `&start=${item.timestamp}`: '')} className='button'>
								<FontAwesomeIcon icon={faPlay}/> PLAY
							</a>
							<button className='info button' onClick={() => {previewObj.openPreview(item);}}>
								<FontAwesomeIcon icon={faInfoCircle} /> MORE INFO
							</button>
						</div>

					</div>
				</div>
			}
		</div>
	);
};

Billboard.propTypes = {
	previewObj: PropTypes.object.isRequired,
};

export default Billboard;