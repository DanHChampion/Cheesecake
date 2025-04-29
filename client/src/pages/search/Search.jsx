import './Search.scss';
import Preview from '../../components/Preview.jsx';
import Card from '../../components/Card.jsx';
import usePreview from '../../hooks/usePreview.js';
import apiRequest from '../../hooks/apiRequest.js';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


const Search = ({ search }) => {
	const [items,setItems] = useState(null);

	const previewObj = usePreview();
	const [visibleModal, setVisibleModal] = useState(previewObj.isOpen);

	useEffect(() => {
		setVisibleModal(previewObj.isOpen);
	}, [previewObj]);

	const getItems = () => {
		apiRequest().get( 'videos/all', (res, err) => {
			if(!err) {
				// Set items to filtered version
				setItems(res.data.filter(item => {
					return item.title.toLowerCase().includes(search.toLowerCase() );
				}));
			}
		});
	};

	useEffect(() => {
		getItems();
	} , [search]);


	return (
		<div className="Search">
			{visibleModal && <Preview previewObj={previewObj}/>}
			<div className='header'>
				<span>Search</span>
			</div>
			{items &&
				<div className='grid'>
					{items.map((item) => (
						<Card key={item.id} item={item} previewObj={previewObj}/>
					))}
				</div>
			}
			{(items == null || items.length == 0) &&
				<span> No Results Found!</span>
			}
		</div>
	);
};

export default Search;

Search.propTypes = {
	search: PropTypes.string.isRequired,
};
