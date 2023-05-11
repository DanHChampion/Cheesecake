import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.js';
import Users from './pages/users/Users.js';
import Player from './pages/player/Player.js';
import NotFound from './pages/notfound/NotFound.js';
import EditProfile from './pages/profile/EditProfile.js';
import AddProfile from './pages/profile/AddProfile.js';
import Browse from './pages/browse/Browse.js';

function App() {
	const userObject = sessionStorage.getItem('userObject');

	if(userObject === null) {
		return (
			<div id="app" className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/edit" element={<EditProfile/>} />
						<Route path="/add" element={<AddProfile/>} />
						<Route path="*" element={<Users/>} />
					</Routes>
				</BrowserRouter>
			</div>
		);
	}

	return (
		<div id="app" className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/users" element={<Users/>} />
					<Route path="/home" element={<Home/>} />
					<Route path="/watch/*" element={<Player/>}/>
					<Route path="/movies" element={<Browse type='movies'/>} />
					<Route path="/series" element={<Browse type='series'/>} />
					<Route path="/clips" element={<Browse type='clips'/>} />
					<Route path="/*" element={<NotFound/>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
