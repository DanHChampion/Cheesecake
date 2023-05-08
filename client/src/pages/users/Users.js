import './Users.scss';
import { useEffect , useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import apiRequest from '../../hooks/apiRequest.js';

const Users = () => {
	const [users ,setUsers] = useState([]);

	useEffect(() => getUsers(), []);

	const getUsers = () => {
		apiRequest().get('users', (res, err) => {
			if(!err) {
				console.log(res.data);
				setUsers(res.data);
			}
		});
	};

	return (
		<div className='Users'>
			<span>Who&apos;s Watching?</span>
			<div className='wrapper'>
				{users.map((user) => (
					<div className='item' key={user.id}>
						<a href='/home' className='icon-wrapper'>
							<img src={user.icon} alt={user.name+' Avatar'}/>
						</a>
						<p> {user.name} </p>
					</div>
				))}
				<div className='item'>
					<a className='icon-wrapper' href='/users'>
						<FontAwesomeIcon className='icon' icon={faPlus}/>
					</a>
					<p> Add Profile </p>
				</div>
			</div>
		</div>
	);
};

export default Users;
