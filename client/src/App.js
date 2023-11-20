import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home/Home.js';
import Users from './pages/users/Users.js';
import Player from './pages/player/Player.js';
// import Watchlist from './pages/watchlist/Watchlist.js';
import NotFound from './pages/notfound/NotFound.js';
import EditProfile from './pages/profile/EditProfile.js';
import AddProfile from './pages/profile/AddProfile.js';
import Browse from './pages/browse/Browse.js';
import Search from './pages/search/Search.js';
import Experimental from './pages/experimental/Experimental.js';
import Help from './pages/help/Help.js';
import Settings from './pages/settings/Settings.js';
import NavBar from './components/NavBar.js';

function App() {
	const queryParameters = new URLSearchParams(window.location.search);

	const userObject = localStorage.getItem('userObject');
	const navigate = useNavigate();

	const [search, setSearch] = useState(queryParameters.get('q')? queryParameters.get('q'): '');

	const handleSearch = (value) => {
		setSearch(value);
		navigate('/search?q='+value);
	};

	const navigateTo = (path) => {
		navigate(path);
	};

	if(userObject === null) {
		return (
			<div id="app" className="App">
				<Routes>
					<Route path="/edit" element={<EditProfile/>} />
					<Route path="/add" element={<AddProfile/>} />
					<Route path="*" element={<Users/>} />
				</Routes>
			</div>
		);
	}

	return (
		<div id="app" className="App">
			<NavBar searchFunction={handleSearch}/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/home" element={<Home/>} />
				<Route path="/users" element={<Users/>} />
				<Route path="/watch/*" element={<Player navigateTo={navigateTo}/>} />
				<Route path="/watchlist" element={<Browse type='watchlist'/>} />
				<Route path="/movies" element={<Browse type='movies'/>} />
				<Route path="/series" element={<Browse type='series'/>} />
				<Route path="/search" element={<Search search={search}/>} />
				<Route path="/experimental" element={<Experimental/>} />
				<Route path="/help" element={<Help/>} />
				<Route path="/settings" element={<Settings/>} />
				<Route path="/*" element={<NotFound/>} />
			</Routes>
		</div>
	);
}

export default App;
