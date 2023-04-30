import './NavBar.css';
import Dropdown from '../basic/Dropdown.js';
import { useState } from 'react';


const NavBar = () => {

	const [dropdown,setDropdown] = useState(false);

	return(
		<div className="NavBar">
			<a className='nav-item' href='/home'>Logo</a>
			<a className='nav-item' href='/home'>Home</a>
			<a className='nav-item' href='/watchlist'>Watchlist</a>
			<a className='nav-item' href='/movies'>Movies</a>
			<a className='nav-item' href='/series'>Series</a>
			<a className='nav-item' href='/clips'>Clips</a>
			<div className='nav-item'>
				<input type='text'/>
				<button>Search</button>
			</div>
			<a className='nav-item' href='#' onClick={() => {setDropdown(!dropdown);}}><img src={'./default.png'} alt='Profile' /></a>
			{dropdown &&
				<Dropdown/>
			}
		</div>
	);
};

export default NavBar;