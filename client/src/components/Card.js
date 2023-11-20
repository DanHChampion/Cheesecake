import './Card.scss';
import getImage from '../utils/getImage';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import apiRequest from '../hooks/apiRequest';
import { useState } from 'react';

const Card = ({ item , previewObj, continueWatching, deleteOne }) => {

	const handleCardClick = () => {
		if (continueWatching){
			console.log('Do Nothing');
		} else {
			previewObj.openPreview(item);
		}
	};

	const [deleted,setDeleted] = useState(false);

	const getUserObject = () => {
		return JSON.parse(localStorage.getItem('userObject'));
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		const userObject = getUserObject();
		apiRequest().delete('continuewatching/'+userObject._id+'/'+item._id, (res, err) => {
			if(!err) {
				console.log(res.status);
				setDeleted(true);
				deleteOne();
			} else {
				console.error(err);
			}
		});
	};

	// if (deleted) return null;

	return(
		<div className="Card" style={deleted?{ transition:'500ms', width: 0, border:0, margin: 0, opacity:0 }: {}} onClick={() => {handleCardClick();}} >
			<p>{item.title}</p>
			<img src={getImage(item.title+'/coverphoto.jpg')} alt={item.title} onError={(e) => e.target.style.display = 'none'}/>
			{ continueWatching &&
				<a href={'/watch/?type=' + item.type +'&path=' + encodeURIComponent(item.path)+'&start='+item.timestamp} className='overlay'>
					<FontAwesomeIcon icon={faPlay}/>
					<span style={{backgroundSize: (98-(100*item.timestamp/item.duration))+'% 0.5em, '+(2+(100*item.timestamp/item.duration))+'% 0.5em'}}></span>
				</a>
			}
			{ continueWatching &&
				<button onClick={(e) => {handleDelete(e);}}> <FontAwesomeIcon icon={faTimes}/> </button>
			}
		</div>
	);
};

Card.propTypes = {
	item: PropTypes.object.isRequired,
	previewObj: PropTypes.object.isRequired,
	continueWatching: PropTypes.bool,
	deleteOne: PropTypes.func
};

export default Card;