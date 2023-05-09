import './NavBar.scss';
import Dropdown from './Dropdown.js';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faFilm, faTvAlt, faVideo, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const NavBar = () => {

	const getUserObject = () => {
		return JSON.parse(sessionStorage.getItem('userObject'));
	};

	useEffect(() => {
		setUserObject(getUserObject());
	},[]);

	const [userObject,setUserObject] = useState(getUserObject());

	return(
		<div className="NavBar">
			<div className='left-container'>
				<a className='nav-item' href='/home'><img className='logo' src={logo} alt='Logo' /></a>
				<a className='nav-item' href='/home'><FontAwesomeIcon className='icon' icon={faHouse}/><span>HOME</span></a>
				<a className='nav-item' href='/watchlist'><FontAwesomeIcon className='icon' icon={faPlus}/><span>WATCHLIST</span></a>
				<a className='nav-item' href='/movies'><FontAwesomeIcon className='icon' icon={faFilm}/><span>MOVIES</span></a>
				<a className='nav-item' href='/series'><FontAwesomeIcon className='icon' icon={faTvAlt}/><span>SERIES</span></a>
				<a className='nav-item' href='/clips'><FontAwesomeIcon className='icon' icon={faVideo}/><span>CLIPS</span></a>
			</div>
			<div className='right-container'>
				<div className='search-container'>
					<input id='searchbar' placeholder='Titles, peoples, genres' type='text'/>
					<label htmlFor='searchbar' className='button' ><FontAwesomeIcon className='big-icon' icon={faMagnifyingGlass}/></label>
				</div>
				<a className='nav-item' href='#'><FontAwesomeIcon className='big-icon' icon={faBell}/></a>
				<Dropdown>
					<a className='nav-item' href='#'>
						<div className='img-wrapper'>
							<img src={userObject? userObject.icon : './default.png'} alt='Profile' />
						</div>
					</a>
				</Dropdown>
			</div>
		</div>
	);
};

export default NavBar;