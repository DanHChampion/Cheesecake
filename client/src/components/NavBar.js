import './NavBar.scss';
import Dropdown from './Dropdown.js';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faFilm, faTvAlt, faVideo, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const NavBar = () => {

	const [dropdown,setDropdown] = useState(false);
	const [search,setSearch] = useState(false);


	return(
		<div className="NavBar">
			<div className='left-container'>
				<a className='nav-item' href='/home'><img className='logo' src={logo} alt='Logo' /></a>
				<a className='nav-item' href='/home'><FontAwesomeIcon className='icon' icon={faHouse}/>HOME</a>
				<a className='nav-item' href='/watchlist'><FontAwesomeIcon className='icon' icon={faPlus}/>WATCHLIST</a>
				<a className='nav-item' href='/movies'><FontAwesomeIcon className='icon' icon={faFilm}/>MOVIES</a>
				<a className='nav-item' href='/series'><FontAwesomeIcon className='icon' icon={faTvAlt}/>SERIES</a>
				<a className='nav-item' href='/clips'><FontAwesomeIcon className='icon' icon={faVideo}/>CLIPS</a>
			</div>
			<div className='right-container'>
				<div className='search-container nav-item'>
					{search && <input id='searchbar' placeholder='Titles, peoples, genres' type='text'/>}
					<button onClick={() => {setSearch(!search);}}><FontAwesomeIcon className='big-icon' icon={faMagnifyingGlass}/></button>
				</div>
				<a className='nav-item' href='#'><FontAwesomeIcon className='big-icon' icon={faBell}/></a>
				<a className='nav-item' href='#' onClick={() => {setDropdown(!dropdown);}}><img src={'./default.png'} alt='Profile' /></a>
			</div>
			{dropdown &&
				<Dropdown/>
			}
		</div>
	);
};

export default NavBar;