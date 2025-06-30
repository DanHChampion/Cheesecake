import './Settings.scss';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../hooks/apiRequest';
import ChangeIcon from '../../components/ChangeIcon';
import Select from '../../components/Select';
import { applyCustomTheme } from '../../hooks/colourTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import getStaticFile from '../../utils/getStaticFile';

const Settings = () => {

	const navigate = useNavigate();

	const getUserObject = () => {
			return JSON.parse(localStorage.getItem('userObject'));
	};

	const getAvailableThemes = () => {
		apiRequest().get('themes', (res, err) => {
			if(!err) {
				console.log(res.data);
				res.data.forEach(theme => {
					fetch(getStaticFile('/_themes/'+theme.path))
						.then(response => response.json())
						.then(data => {
							setAvailableThemes(prevThemes => ({
								...prevThemes,
								[theme.name]: data
							}));
						})
						.catch(err => console.error('Error loading theme:', err));
				});
			} else {
				console.error(err);
			}
		});
	};
	
	useEffect(() => {
		setUserObject(getUserObject());
		getAvailableThemes();
	},[]);

	const [userObject,setUserObject] = useState(getUserObject());

	const [name, setName] = useState(userObject.name);
	const [avatar, setAvatar] = useState(userObject.avatar);
	const [theme, setTheme] = useState(userObject.theme);
	const [language, setLanguage] = useState('English');

	const [availableThemes, setAvailableThemes] = useState([]);

	const handleSubmit = () => {
		const body = {
			'name': name? name : null,
			'avatar': avatar? avatar : null,
			'theme': theme? theme : null,
			'language': language? language : null
		};
		apiRequest().patch('users/'+userObject._id, body, (res, err) => {
			if(!err) {
				console.log(res.status);
				const updatedUserObject = {
					...userObject,
					name: name,
					avatar: avatar,
					theme: theme,
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

	const handleThemeChange = (themeKey) => {
		setTheme(themeKey);
		applyCustomTheme(availableThemes[themeKey]);
		console.log(themeKey);
		console.log('Theme applied');
	}

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
					<section>
						<div className='left section'>
							<h2>Appearance</h2>
							<p>Customize the appearance of the application.</p>
						</div>
						<div className='right section'>
							{Object.keys(availableThemes).map((themeKey) => {
								return (
									<div key={themeKey} className='theme-wrapper'
										onClick={() => {handleThemeChange(themeKey);}}>
										{availableThemes && availableThemes[themeKey] &&
											<div className='theme-boxes'>
												{['--primary-colour', '--highlight-colour', '--bg-darker-colour', '--bg-colour', '--bg-lighter-colour', '--font-colour'].map((colourKey, index) => (
													<div 
														key={index} 
														className='theme-box'
														style={{
															backgroundColor: availableThemes[themeKey][colourKey],
														}}
													>
													</div>
												))}
												<div className='theme-name'>{themeKey}</div>
											</div>
										}	
										{availableThemes[themeKey] && themeKey === theme ? <div className='selected'><FontAwesomeIcon icon={faCheck}/></div> : null}
									</div>
								);
							})}
							<div className='theme-wrapper'
								onClick={() => {handleUploadTheme();}}>
								<div className='upload-button'>Upload Theme</div>
							</div>
						</div>
					</section>
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