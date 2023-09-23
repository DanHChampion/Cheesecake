import './ChangeIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import getImage from '../utils/getImage';
import apiRequest from '../hooks/apiRequest';
import { useState , useEffect } from 'react';

const ChangeIcon = ({inputIconPath, setState}) => {
	const queryParameters = new URLSearchParams(window.location.search);
	const id = queryParameters.get('id');
	const [avatars, setAvatars] = useState(null);
	const [iconPath, setIconPath] = useState(inputIconPath);
	const [popup, setPopup] = useState(false);

	const handleChange = (path) => {
		setIconPath(path);
		setState(path);
		setPopup(false);
	};

	useEffect(() => {if (inputIconPath === '') getUserObject();}, []);
	useEffect(() => getAvatars(), []);

	const getAvatars = () => {
		apiRequest().get( 'images/avatars', (res, err) => {
			if(!err) {
				setAvatars(res.data);
			}
		});
	};

	const getUserObject = () => {
		apiRequest().get( 'users/'+id, (res, err) => {
			if(!err) {
				setIconPath(res.data.icon);
			}
		});
	};

	return(
		<div className="ChangeIcon">
			<div onClick={() => {setPopup(true);}} className='icon-wrapper editable'>
				{iconPath !== '' && <img src={getImage('_avatars/'+iconPath)}/>}
				<FontAwesomeIcon icon={faPencil}/>
			</div>
			{popup && <div className='popup-wrapper'>
				<div className='popup'>
					<div className='header'>
						<span>Choose Avatar</span>
						<button className='button' onClick={() => {setPopup(false);}}>CANCEL</button>
					</div>
					{avatars &&
					<div className='avatars-list'>
						{avatars.map((avatar) => (
							<div key={avatar.id} onClick={() => handleChange(avatar.path)} className='icon-wrapper'>
								<img src={getImage('_avatars/'+ avatar.path)}/>
							</div>
						))}
					</div>
					}
				</div>
			</div>
			}
		</div>
	);
};

ChangeIcon.propTypes = {
	inputIconPath: PropTypes.string.isRequired,
	setState: PropTypes.func.isRequired,
};

export default ChangeIcon;