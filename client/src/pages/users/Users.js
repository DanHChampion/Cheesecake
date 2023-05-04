import './Users.scss';
import { useEffect , useState } from 'react';
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
			<p>Who&apos;s Watching?</p>
			<div className='wrapper'>
				{users.map((user) => (
					<a className='item' key={user.id} href='/home'>
						<img src='./default.png' alt={user.name + '\'s Icon'}/>
						<p> {user.name} </p>
						<p> Edit Profile </p>
					</a>
				))}
				<a className='item' href='/users'>
					<img src='./plus_icon.png' alt='Plus Icon'/>
					<p> Add Profile </p>
				</a>
			</div>
		</div>
	);
};

export default Users;
