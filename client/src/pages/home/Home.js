import './Home.scss';
import NavBar from '../../components/NavBar.js';
import Carousel from '../../components/Carousel.js';
import Preview from '../../components/Preview.js';
import usePreview from '../../hooks/usePreview';
import { useEffect, useState } from 'react';

const Home = () => {

	const previewObj = usePreview();
	const [visibleModal, setVisibleModal] = useState(previewObj.isOpen);
	useEffect(() => {
		setVisibleModal(previewObj.isOpen);
	}, [previewObj]);

	return (
		<div className="Home">
			<NavBar/>
			{visibleModal && <Preview previewObj={previewObj}/>}

			<div className='billboard'>
				<a href={'/watch/?id=8'}>
					[POSTER]
					<p> Sprited Away</p>
				</a>
			</div>
			<Carousel label={'Continue Watching'} previewObj={previewObj} endpoint={'contwatch'}/>
			<Carousel label={'All Movies'} previewObj={previewObj} endpoint={'movies'}/>
			<Carousel label={'Movies'} previewObj={previewObj} endpoint={'videos/movies'}/>
			<Carousel label={'Horror'} previewObj={previewObj} endpoint={'videos/horror'}/>
			<Carousel label={'Watchlist'} previewObj={previewObj} endpoint={'watchlist'}/>
		</div>
	);
};

export default Home;
