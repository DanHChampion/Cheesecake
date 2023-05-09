import './Profile.scss';
import apiRequest from '../../hooks/apiRequest.js';
import { useState } from 'react';
import ChangeIcon from '../../components/ChangeIcon';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AddProfile = () => {
	const [name, setName] = useState('');
	const [url, setUrl] = useState('https://mir-s3-cdn-cf.behance.net/projects/404/22328711.54a2f9e311082.jpg');

	const handleSubmit = () => {
		const body = {
			'name': name,
			'icon': url
		};
		console.log(body);
		apiRequest().post('users/new', body, (res, err) => {
			if(!err) {
				console.log(res.status);
			} else {
				console.error(err);
			}
		});
	};


	return (
		<div className='Profile'>
			<span>Add Profile</span>
			<form action='/users' onSubmit={() => {handleSubmit();}} className='wrapper'>
				<ChangeIcon inputUrl={url} setState={setUrl} />
				<input type='text' className='input-text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
				<input className='button' type='submit' value="Create"/>
				<a href='/users' className='button'>Cancel</a>
			</form>
		</div>
	);
};

export default AddProfile;