import './Home.scss';
import Carousel from '../../components/Carousel.js';
import Preview from '../../components/Preview.js';
import Billboard from './Billboard.js';
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
			{visibleModal && <Preview previewObj={previewObj}/>}

			<Billboard/>
			<Carousel label={'Movies'} previewObj={previewObj} endpoint={'videos/movies'}/>
			<Carousel label={'Series'} previewObj={previewObj} endpoint={'videos/series'}/>
			<Carousel label={'Continue Watching'} previewObj={previewObj} endpoint={'contwatch'}/>
			<Carousel label={'Watchlist'} previewObj={previewObj} endpoint={'watchlist'}/>
		</div>
	);
};

export default Home;
