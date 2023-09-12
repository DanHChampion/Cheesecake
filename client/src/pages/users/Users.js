import './Users.scss';
import { useEffect , useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faPencil } from '@fortawesome/free-solid-svg-icons';
import apiRequest from '../../hooks/apiRequest.js';
import getImage from '../../utils/getImage.js';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [toggleEdit, setToggleEdit] = useState(false);

	useEffect(() => {getUsers(); logOut();}, []);

	const getUsers = () => {
		apiRequest().get('users', (res, err) => {
			if(!err) {
				console.log(res.data);
				setUsers(res.data);
			}
		});
	};

	const logOut = () => {
		sessionStorage.clear();
	};

	const logIn = (userObject) => {
		sessionStorage.setItem('userObject', JSON.stringify(userObject));
	};

	return (
		<div className='Users'>
			<span>Who&apos;s watching?</span>
			<div className='wrapper'>
				{users.map((user) => (
					<div className='item' key={user.id}>
						<a href={toggleEdit? '/edit/?id='+user.id : '/home'} onClick={toggleEdit? console.log('editing') : () => {logIn(user);}} className={toggleEdit? 'icon-wrapper jiggle' : 'icon-wrapper'}>
							<img src={getImage('_avatars/'+user.icon)} alt={user.name+' Avatar'}/>
							{toggleEdit && <FontAwesomeIcon className='edit' icon={faPencil}/>}
						</a>
						<p>{user.name}</p>
					</div>
				))}
				<div className='item'>
					<a className='icon-wrapper' href='/add'>
						<FontAwesomeIcon className='icon' icon={faPlus}/>
					</a>
					<p>Add Profile</p>
				</div>
			</div>
			<button className='button' onClick={() => {setToggleEdit(!toggleEdit);}}>{toggleEdit? 'DONE' : 'MANAGE PROFILES'}</button>
		</div>
	);
};

export default Users;
