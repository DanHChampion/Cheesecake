import './Home.scss';
import Carousel from '../../components/Carousel.jsx';
import Preview from '../../components/Preview.jsx';
import Billboard from './Billboard.jsx';
import usePreview from '../../hooks/usePreview.js';
import { useEffect, useState } from 'react';

const Home = () => {

	const previewObj = usePreview();
	const [visibleModal, setVisibleModal] = useState(previewObj.isOpen);
	useEffect(() => {
		setVisibleModal(previewObj.isOpen);
	}, [previewObj]);

	const getUserObject = () => {
		return JSON.parse(localStorage.getItem('userObject'));
	};

	useEffect(() => {
		setUserObject(getUserObject());
	},[]);

	const [userObject,setUserObject] = useState(getUserObject());

	return (
		<div className="Home">
			<div className='page-content'>
				{visibleModal && <Preview previewObj={previewObj}/>}

				<Billboard/>
				{/* <Carousel label={'Recommended'} previewObj={previewObj} endpoint={'recommend'}/> */}
				<Carousel label={'Continue Watching for ' + userObject.name} previewObj={previewObj} type={'CW'} endpoint={'continuewatching/' + userObject._id}/>
				<Carousel label={'Movies'} previewObj={previewObj} endpoint={'videos/movies'}/>
				<Carousel label={'Series'} previewObj={previewObj} endpoint={'videos/series'}/>
				<Carousel label={'Watchlist'} previewObj={previewObj} endpoint={'watchlist/'+userObject._id}/>
			</div>
		</div>
	);
};

export default Home;
