import './Browse.scss';
import Preview from '../../components/Preview.js';
import Card from '../../components/Card.js';
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
			{visibleModal && <Preview previewObj={previewObj}/>}
			<div className='header'>
				<span>{type}</span>
				<select>
					<option value="all">All {type}</option>
					<option value="action">Action</option>
					<option value="comedy">Comedy</option>
					<option value="horror">Horror</option>
				</select>
			</div>
			{items &&
				<div className='grid'>
					{items.map((item) => (
						<Card key={item.id} item={item} previewObj={previewObj}/>
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