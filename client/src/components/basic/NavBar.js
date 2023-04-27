import './NavBar.css';

const NavBar = () => {
	return(
		<div className="NavBar">
			<a href='/home'>Home</a>
			<a href='/search'>Search</a>
			<a href='/watchlist'>Watchlist</a>
			<a href='/movies'>Movies</a>
			<a href='/series'>Series</a>
			<a href='/clips'>Clips</a>
		</div>
	);
};

export default NavBar;