import './Profile.scss';
import apiRequest from '../../hooks/apiRequest.js';
import { useState } from 'react';
import ChangeIcon from '../../components/ChangeIcon';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AddProfile = () => {
	const [name, setName] = useState('');
	const [iconPath, setIconPath] = useState('avatar0.jpg');

	const handleSubmit = () => {

		const body = {
			'name': name === ''? 'Profile': name,
			'icon': iconPath
		};
		apiRequest().post('users', body, (res, err) => {
			if(!err) {
				console.log(res.status);
			} else {
				console.error(err);
			}
		});
	};


	return (
		<div className='Profile'>
			<form action='/users' onSubmit={() => {handleSubmit();}} className='wrapper'>
				<span>Add Profile</span>
				<p>Create a new profile for someone else.</p>
				<div className='row'>
					<ChangeIcon inputIconPath={iconPath} setState={setIconPath} />
					<input type='text' className='input-text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
				</div>
				<div className='row'>
					<input className='button' type='submit' value='CREATE'/>
					<a href='/users' className='button'>CANCEL</a>
				</div>
			</form>
		</div>
	);
};

export default AddProfile;