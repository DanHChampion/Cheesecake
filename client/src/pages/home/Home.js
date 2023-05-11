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
				{/* <video src='https://www.youtube.com/embed/uYPbbksJxIg?controls=0' /> */}
				<iframe width="100%" height="100%" src="https://www.youtube.com/embed/uYPbbksJxIg?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			</div>
			<Carousel label={'Continue Watching'} previewObj={previewObj} endpoint={'contwatch'}/>
			<Carousel label={'All Movies'} previewObj={previewObj} endpoint={'movies'}/>
			<Carousel label={'Movies'} previewObj={previewObj} endpoint={'videos/movies'}/>
			<Carousel label={'Series'} previewObj={previewObj} endpoint={'videos/series'}/>
			<Carousel label={'Watchlist'} previewObj={previewObj} endpoint={'watchlist'}/>
		</div>
	);
};

export default Home;
