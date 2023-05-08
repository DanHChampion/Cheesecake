import './Preview.scss';
// import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import usePreview from '../hooks/usePreview.js';

const Preview = ({ previewObj }) => {
	const itemData = previewObj.itemData;

	return(
		<div className="Preview">
			<button className='exit' onClick={() => {previewObj.closePreview(false);}}>
				X
			</button>
			<img src={itemData.imagepath} alt={itemData.title +' Poster'}/>
			<a href={'/watch/?type=' + itemData.type +'&path=' + itemData.videopath} className='item'>
				Play
			</a>
			<button> + Watchlist</button>
		</div>
	);
};

export default Preview;

Preview.propTypes = {
	previewObj: PropTypes.object.isRequired,
	// visible: PropTypes.bool.isRequired,
	// onClose: PropTypes.func.isRequired,
};