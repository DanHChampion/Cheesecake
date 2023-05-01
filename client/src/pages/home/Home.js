import './Home.css';
import NavBar from '../basic/NavBar.js';
import Carousel from '../basic/Carousel.js';

const Home = () => {

	return (
		<div className="Home">
			<NavBar/>
			<div className='billboard'>
				<a href={'/watch/?id=8'}>
					[POSTER]
					<p> Sprited Away</p>
				</a>
			</div>
			<Carousel label={'Continue Watching'} endpoint={'contwatch'}/>
			<Carousel label={'All Movies'} endpoint={'movies'}/>
			<Carousel label={'Watchlist'} endpoint={'watchlist'}/>
		</div>
	);
};

export default Home;
