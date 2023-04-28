import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.js';
import Users from './components/users/Users.js';
import NotFound from './components/notfound/NotFound.js';

function App() {

	return (
		<div id="app" className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/users" element={<Users/>} />
					<Route path="/home" element={<Home/>} />
					<Route path="/*" element={<NotFound/>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
