import './Profile.scss';
import { useEffect, useState } from 'react';
import ChangeIcon from '../../components/ChangeIcon';
import apiRequest from '../../hooks/apiRequest';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
	const queryParameters = new URLSearchParams(window.location.search);
	const id = queryParameters.get('id');
	const [name, setName] = useState('');
	const [iconPath, setIconPath] = useState('');

	useEffect(() => getUserObject(), []);

	const getUserObject = () => {
		apiRequest().get( 'users/'+id, (res, err) => {
			if(!err) {
				setName(res.data.name);
				setIconPath(res.data.avatar);
				console.log(res.data.avatar);
			}
		});
	};


	const handleSubmit = () => {
		const body = {
			'name': name? name : null,
			'avatar': iconPath? iconPath : null
		};
		apiRequest().patch('users/'+id, body, (res, err) => {
			if(!err) {
				console.log(res.status);
			} else {
				console.error(err);
			}
		});
	};

	const handleDelete = () => {
		apiRequest().delete('users/'+id, (res, err) => {
			if(!err) {
				console.log(res.status);
			} else {
				console.error(err);
			}
		});
	};


	return (
		<div className='Profile'>
			<form action='/users' className='wrapper'>
				<span>Edit Profile</span>
				<p>Edit the profile for {name}.</p>
				<div className='row'>
					<ChangeIcon inputIconPath={iconPath} setState={setIconPath} />
					<input type='text' className='input-text' placeholder='Name' defaultValue={name} onChange={(e) => setName(e.target.value)}></input>
				</div>
				<div className='row'>
					<button className='button' onClick={() => {handleSubmit();}} type='submit'>SAVE</button>
					<a href='/users' className='button'>CANCEL</a>
					<button className='button delete' onClick={() => {handleDelete();}}>DELETE PROFILE</button>
				</div>
			</form>
		</div>
	);
};

export default EditProfile;