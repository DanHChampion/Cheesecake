import './Browse.scss';
import NavBar from '../../components/NavBar.js';
import Preview from '../../components/Preview.js';
import usePreview from '../../hooks/usePreview';
import apiRequest from '../../hooks/apiRequest';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const Browse = ({type}) => {

	const [items,setItems] = useState(null);

	const previewObj = usePreview();
	const [visibleModal, setVisibleModal] = useState(previewObj.isOpen);

	useEffect(() => {
		setVisibleModal(previewObj.isOpen);
	}, [previewObj]);

	const getItems = () => {
		apiRequest().get( 'videos/'+type, (res, err) => {
			if(!err) {
				setItems(res.data);
			}
		});
	};

	useEffect(() => getItems() , []);

	return (
		<div className="Browse">
			<NavBar/>
			{visibleModal && <Preview previewObj={previewObj}/>}
			<span>{type}</span>
			<select id="cars" name="cars">
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="fiat">Fiat</option>
				<option value="audi">Audi</option>
			</select>
			{items &&
				<div className='container'>
					{items.map((item) => (
						<div onClick={() => {previewObj.openPreview(item);}} className='item' key={item.id}>
							<img src={item.imagepath} alt={item.title +' Poster'}/>
						</div>
					))}
				</div>
			}
		</div>
	);
};

export default Browse;

Browse.propTypes = {
	type: PropTypes.string.isRequired
};