import './Home.css';
import { useEffect , useState } from 'react';
import NavBar from '../basic/NavBar.js'
import apiRequest from '../hooks/apiRequest.js';

const Home = () => {
  const [continueWatching, setContinueWatching] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getContinueWatching();
    getWatchlist();
    getRandomMovies();
  },[]);

  const getContinueWatching = () => {
    apiRequest().get('contwatch', (res, err) => {
			if(!err) {
        console.log(res.data);
				setContinueWatching(res.data);
			}
		});
  }

  const getWatchlist = () => {
    apiRequest().get('watchlist', (res, err) => {
			if(!err) {
        console.log(res.data);
				setWatchlist(res.data);
			}
		});
  }

  const getRandomMovies = () => {
    apiRequest().get('movies', (res, err) => {
			if(!err) {
        console.log(res.data);
				setMovies(res.data);
			}
		});
  }

  return (
    <div className="Home">
      <NavBar/>
      <h2>Welcome back!</h2>
      <p>Continue Watching</p>
      <div className='row'>
        {continueWatching.map((item) => (
            <div className='item' key={item.id}> 
              <a href='/'>
                [POSTER]
                <p> {item.title} </p> 
              </a>
            </div>
          ))}
      </div>
      <p>Watchlist</p>
      <div className='row'>
        {watchlist.map((item) => (
            <div className='item' key={item.id}> 
              <a href='/'>
                [POSTER]
                <p> {item.title} </p> 
              </a>
            </div>
          ))}
      </div>
      <p>Movies</p>
      <div className='row'>
        {movies.map((item) => (
            <div className='item' key={item.id}> 
              <a href='/'>
                [POSTER]
                <p> {item.title} </p> 
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
