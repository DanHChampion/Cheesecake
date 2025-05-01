import './Settings.scss';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../hooks/apiRequest';
import ChangeIcon from '../../components/ChangeIcon';
import Select from '../../components/Select';

const Settings = () => {

	const navigate = useNavigate();

	const getUserObject = () => {
			return JSON.parse(localStorage.getItem('userObject'));
		};
	
	useEffect(() => {
		setUserObject(getUserObject());
	},[]);

	const [userObject,setUserObject] = useState(getUserObject());

	const [name, setName] = useState(userObject.name);
	const [avatar, setAvatar] = useState(userObject.avatar);
	const [language, setLanguage] = useState('English');

	const handleSubmit = () => {
		const body = {
			'name': name? name : null,
			'avatar': avatar? avatar : null,
			'language': language? language : null
		};
		apiRequest().patch('users/'+userObject._id, body, (res, err) => {
			if(!err) {
				console.log(res.status);
				const updatedUserObject = {
					...userObject,
					name: name,
					avatar: avatar,
					language: language
				};
				localStorage.setItem('userObject', JSON.stringify(updatedUserObject));
				setUserObject(updatedUserObject);
			} else {
				console.error(err);
			}
		});
	};

	const handleDelete = () => {
		apiRequest().delete('users/'+userObject._id, (res, err) => {
			if(!err) {
				console.log(res.status);
				localStorage.removeItem('userObject');
				navigate('/users');
			} else {
				console.error(err);
			}
		});
	};

	return (
		<div className='Settings'>
			<div className='main'>
				<h1 className='header'>
					Settings
				</h1>
				<div className='content'>
					<section className='user-settings'>
						<div className='left section'>
							<h2>Profile</h2>
							<p>Manage your profile settings.</p>
						</div>
						<div className='right section'>
							<ChangeIcon inputIconPath={avatar} setState={setAvatar}/>
							<input type='text' className='input-text' placeholder='Name' defaultValue={userObject.name} onChange={(e) => setName(e.target.value)}></input>
							<button className='delete button' onClick={()=>{handleDelete();}}>Delete Profile</button>
						</div>
					</section>
					{/* <section>
						<div className='left-section'>
							<h2>Appearance</h2>
							<p>Customize the appearance of the application.</p>
						</div>
						<div className='right-section'>
							<h2>Not available yet...</h2>
						</div>
					</section> */}
					<section>
						<div className='left section'>
							<h2>Language</h2>
							<p>Choose the language of the application.</p>
						</div>
						<div className='right section'>
							<div className='select-wrapper'>
								<Select options={['English']} value={language} setState={setLanguage}/>
							</div>
						</div>
					</section>
					{/* <section>
						<div className='left-section'>
							<h2>Video Player</h2>
							<p>Change the video player settings.</p>
						</div>
						<div className='right-section'>
							<h2>Not available yet...</h2>
						</div>
					</section> */}
					<div className='footer'>
						{/* <button className='button'>Cancel</button> */}
						<button className='save button' onClick={() => {handleSubmit();}}>Save</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;