import './ChangeIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
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
				setIconPath(res.data.avatar);
			}
		});
	};

	function handleSubmit(event) {
		event.preventDefault();
		const fieldname = 'avatar';
		let body = {};
		body[fieldname] = event.target.files[0];
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		apiRequest().post('images/upload/'+ fieldname +'/new', body, config, (res, err) => {
			if(!err) {
				console.log(res.status);
				getAvatars();
			} else {
				console.error(err);
			}
		});
	}

	return(
		<div className="ChangeIcon">
			<div onClick={() => {setPopup(true);}} className='icon-wrapper editable'>
				{iconPath !== '' && <img src={getImage('_avatars/'+iconPath)}/>}
				<FontAwesomeIcon icon={faPencil} className='edit-icon'/>
			</div>
			{popup && <div className='popup-wrapper'>
				<div className='popup'>
					<div className='header'>
						<span>Choose Avatar</span>
						<button className='button' onClick={() => {setPopup(false);}}>CANCEL</button>
					</div>
					{avatars &&
					<div className='avatars-wrapper'>
						<div className='avatars-list'>
							{avatars.map((avatar) => (
								<div key={avatar.id} onClick={() => handleChange(avatar.path)} className='icon-wrapper'>
									<img src={getImage('_avatars/'+ avatar.path)}/>
								</div>
							))}
							<div className='icon-wrapper'>
								<label htmlFor="avatar" className='add-icon'>
									<FontAwesomeIcon icon={faPlus}/>
								</label>
								<input type="file" name="avatar" id="avatar" accept="image/*" onChange={handleSubmit}/>
							</div>
						</div>
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