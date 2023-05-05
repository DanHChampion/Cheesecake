import './Users.css';
import { useEffect , useState } from 'react';
import apiRequest from '../hooks/apiRequest.js';

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
					<div className='square' key={user.id}>
						<a href='/home'>
							[ICON]
							<p> {user.name} </p>
						</a>
						<p> Edit Profile </p>
					</div>
				))}
				<div className='square'>
					<a href='/users'>
						[ICON]
						<p> Add Profile </p>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Users;
