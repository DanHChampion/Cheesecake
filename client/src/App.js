import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.js';
import Users from './components/users/Users.js';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
          <Route path="/users" element={<Users/>} />
					<Route path="*" element={<Home/>} />
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
