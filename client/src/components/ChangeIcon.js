import './ChangeIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ChangeIcon = ({inputUrl, setState}) => {

	const [url, setUrl] = useState(inputUrl);
	const [popup, setPopup] = useState(false);

	const handleChange = () => {
		setState(url);
		setPopup(false);
	};

	return(
		<div className="ChangeIcon">
			<div onClick={() => {setPopup(true);}} className='img-wrapper'>
				<img src={inputUrl}/>
				<FontAwesomeIcon icon={faPencil}/>
			</div>
			{popup &&
				<div className='popup'>
					<img src={url}/>
					<input onChange={e => setUrl(e.target.value)} placeholder='Image URL'/>
					<button onClick={() => {handleChange();}}>Change</button>
					<button onClick={() => {setPopup(false);}}>Cancel</button>
				</div>
			}
		</div>
	);
};

ChangeIcon.propTypes = {
	inputUrl: PropTypes.string.isRequired,
	setState: PropTypes.func.isRequired,
};

export default ChangeIcon;