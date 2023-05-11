import './Preview.scss';
// import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes , faPlus , faPlay } from '@fortawesome/free-solid-svg-icons';
import Episodes from './Episodes';

// import usePreview from '../hooks/usePreview.js';

const Preview = ({ previewObj }) => {
	const itemData = previewObj.itemData;

	return(
		<div className='Preview'>
			<div className='background'/>
			<div className='scrollable-wrapper'>
				<div className="popup">
					<button className='exit' onClick={() => {previewObj.closePreview(false);}}>
						<FontAwesomeIcon icon={faTimes}/>
					</button>
					<div className='img-wrapper'>
						<img src={itemData.imagepath === null ? itemData.imagepath : 'https://www.hometheaterforum.com/community/media/2014-interstellar-movie-poster.1964/full'} alt={itemData.title +' Poster'}/>
						<div className='button-container'>
							<a href={'/watch/?type=' + itemData.type +'&path=' + itemData.videopath} className='button'>
								<FontAwesomeIcon icon={faPlay}/> PLAY
							</a>
							<button className='icon-button'><FontAwesomeIcon icon={faPlus} /></button>
						</div>
					</div>
					<div className='video-info'>
						<p>{itemData.title}</p>
						<p> YEAR</p>
						<p> SYNOPSIS</p>
						<p> GENRES</p>
						<p> TAGS</p>
						<p> DIRECTOR</p>
						<p> CAST</p>
						<p> DURATION</p>
					</div>
					{itemData.type !== 'movie' &&
						<Episodes/>
					}
				</div>
			</div>
		</div>
	);
};

export default Preview;

Preview.propTypes = {
	previewObj: PropTypes.object.isRequired,
};