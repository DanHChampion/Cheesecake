import './Billboard.scss';
import getImage from '../../utils/getImage.js';
import apiRequest from '../../hooks/apiRequest.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect , useState } from 'react';


const Billboard = () => {

	const [item,setItem] = useState(null);
	const [missingTitleImage, setMissingTitleImage] = useState(null);

	useEffect(() => {
		getRandomItem();
	}, []);

	const getRandomItem = () => {
		apiRequest().get( 'videos/all', (res, err) => {
			if(!err) {
				// Pick random one
				let rgn = Math.floor(Math.random()*res.data.length);
				console.log(rgn);
				setItem(res.data[rgn]);
			}
		});
	};

	return(
		<div className="Billboard">
			{item &&
				<div className='img-wrapper'>
					<img className='poster' src={getImage(item.title+'/preview.jpg')} alt={item.title +' Poster'} onError={(e) => e.target.style.display = 'none'}/>
					<div className='button-container'>
						<img src={getImage(item.title+'/title.png')} alt={item.title +' Title'} onError={(e) => {e.target.style.display = 'none'; setMissingTitleImage(true);}}/>
						{missingTitleImage && <h1>{item.title}</h1>}
						<a href={'/watch/?type=' + item.type +'&path=' + encodeURIComponent(item.path)} className='button'>
							<FontAwesomeIcon icon={faPlay}/> PLAY
						</a>
					</div>
				</div>
			}
		</div>
	);
};


export default Billboard;