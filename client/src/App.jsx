import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home/Home.jsx';
import Users from './pages/users/Users.jsx';
import Player from './pages/player/Player.jsx';
import NotFound from './pages/notfound/NotFound.jsx';
import EditProfile from './pages/profile/EditProfile.jsx';
import AddProfile from './pages/profile/AddProfile.jsx';
import Browse from './pages/browse/Browse.jsx';
import Search from './pages/search/Search.jsx';
import Help from './pages/help/Help.jsx';
// import Settings from './pages/settings/Settings.jsx';
import NavBar from './components/NavBar.jsx';

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
				<Route path="/help" element={<Help/>} />
				{/* <Route path="/settings" element={<Settings/>} /> */}
				<Route path="/*" element={<NotFound/>} />
			</Routes>
		</div>
	);
}

export default App;
