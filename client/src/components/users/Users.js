import './Users.css'
import { useEffect , useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users ,setUsers] = useState([]);

  useEffect(() => getUsers(), []);

  const getUsers = () => {
    const url = 'http://localhost:8080'
    axios.get(`${url}/users`)
    .then (response => {
      setUsers(response.data)
      console.log(response.data)
    })
  }

  return (
    <div className='Users'>
      <p>Who's Watching?</p>
      <div className='wrapper'>
        {users.map((user) => (
          <div className='square' key={user.id}> 
            <a href='/'>
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
}

export default Users;
