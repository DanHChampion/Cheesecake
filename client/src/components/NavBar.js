import './NavBar.scss';
import Dropdown from './Dropdown.js';
import Notification from './Notification.js';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faFilm, faTvAlt, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';
import PropTypes from 'prop-types';
import getImage from '../utils/getImage.js';

const NavBar = ({ searchFunction }) => {

	const getUserObject = () => {
		return JSON.parse(localStorage.getItem('userObject'));
	};

	useEffect(() => {
		setUserObject(getUserObject());
	},[]);

	const [userObject,setUserObject] = useState(getUserObject());

	return(
		<div className="NavBar">
			<div className='left-container'>
				<a className='nav-item logo' href='/home'></a>
				<a className='nav-item' href='/home'><FontAwesomeIcon className='icon' icon={faHouse}/><span>HOME</span></a>
				<a className='nav-item' href='/watchlist'><FontAwesomeIcon className='icon' icon={faPlus}/><span>WATCHLIST</span></a>
				<a className='nav-item' href='/movies'><FontAwesomeIcon className='icon' icon={faFilm}/><span>MOVIES</span></a>
				<a className='nav-item' href='/series'><FontAwesomeIcon className='icon' icon={faTvAlt}/><span>SERIES</span></a>
			</div>
			<div className='right-container'>
				<div className='search-container'>
					<input id='searchbar' placeholder='Titles, peoples, genres' type='text' onChange={(e) => {searchFunction(e.target.value);}}/>
					<label htmlFor='searchbar' className='button' ><FontAwesomeIcon className='big-icon' icon={faMagnifyingGlass}/></label>
				</div>
				<Notification>
					<a role='notifications' className='nav-item' href='#'><FontAwesomeIcon className='big-icon' icon={faBell}/></a>
				</Notification>
				<Dropdown>
					<a className='nav-item' href='#'>
						<div className='img-wrapper'>
							<img src={userObject? getImage('_avatars/'+userObject.avatar) : 'avatar0.jpg'} alt='Profile' />
						</div>
					</a>
				</Dropdown>
			</div>
		</div>
	);
};

export default NavBar;

NavBar.propTypes = {
	searchFunction: PropTypes.func.isRequired,
};