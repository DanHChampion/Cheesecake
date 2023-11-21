import './Billboard.scss';
import getImage from '../../utils/getImage.js';
import apiRequest from '../../hooks/apiRequest.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect , useState } from 'react';


const Billboard = () => {

	const [items,setItems] = useState(null);


	useEffect(() => {
		getRandomItem();
	}, []);

	const getRandomItem = () => {
		apiRequest().get( 'videos/all', (res, err) => {
			if(!err) {
				// Pick random one
				let rgn = Math.floor(Math.random()*res.data.length);
				console.log(rgn);
				setItems(res.data[rgn]);
			}
		});
	};

	return(
		<div className="Billboard">
			{items &&
				<div className='img-wrapper'>
					<img className='poster' src={getImage(items.title+'/preview.jpg')} alt={items.title +' Poster'} onError={(e) => e.target.style.display = 'none'}/>
					<div className='button-container'>
						<img src={getImage(items.title+'/title.png')} alt={items.title +' Title'} onError={(e) => e.target.style.display = 'none'}/>
						<a href={'/watch/?type=' + items.type +'&path=' + encodeURIComponent(items.path)} className='button'>
							<FontAwesomeIcon icon={faPlay}/> PLAY
						</a>
					</div>
				</div>
			}
		</div>
	);
};


export default Billboard;