import './Card.scss';
import getImage from '../utils/getImage';
import PropTypes from 'prop-types';

const Card = ({ item , previewObj }) => {

	return(
		<div className="Card" onClick={() => {previewObj.openPreview(item);}} >
			<p>{item.title}</p>
			<img src={getImage(item.title+'/coverphoto.jpg')} alt={item.title} onError={(e) => e.target.style.display = 'none'}/>
		</div>
	);
};

Card.propTypes = {
	item: PropTypes.object.isRequired,
	previewObj: PropTypes.object.isRequired,
};

export default Card;