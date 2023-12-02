import './Browse.scss';
import Preview from '../../components/Preview.js';
import Card from '../../components/Card.js';
import usePreview from '../../hooks/usePreview';
import apiRequest from '../../hooks/apiRequest';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const Browse = ({type}) => {

	const [items,setItems] = useState(null);
	const [message,setMessage] = useState('');

	const previewObj = usePreview();
	const [visibleModal, setVisibleModal] = useState(previewObj.isOpen);

	const getUserObject = () => {
		return JSON.parse(localStorage.getItem('userObject'));
	};

	useEffect(() => {
		setUserObject(getUserObject());
	},[]);

	const [userObject,setUserObject] = useState(getUserObject());

	useEffect(() => {
		setVisibleModal(previewObj.isOpen);
	}, [previewObj]);

	const getItems = () => {
		let endpoint = type == 'watchlist' ? 'watchlist/' + userObject._id :'videos/'+type;
		apiRequest().get( endpoint, (res, err) => {
			if(!err) {
				setItems(res.data);
				if (res.data.length == 0 && type == 'watchlist') {
					setMessage('Find movies and series to add to your watchlist!');
				}
			}
		});
	};

	useEffect(() => getItems() , []);

	return (
		<div className="Browse">
			{visibleModal && <Preview previewObj={previewObj}/>}
			<div className='header'>
				<span>{type}</span>
				{type != 'watchlist' &&
					<select>
						<option value="all">All {type}</option>
						<option value="action">Action</option>
						<option value="comedy">Comedy</option>
						<option value="horror">Horror</option>
					</select>
				}
			</div>
			{items &&
				<div className='grid'>
					{items.map((item) => (
						<Card key={item._id} item={item} previewObj={previewObj}/>
					))}
				</div>
			}
			{message}
		</div>
	);
};

export default Browse;

Browse.propTypes = {
	type: PropTypes.string.isRequired
};