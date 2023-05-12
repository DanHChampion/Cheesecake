import './Preview.scss';
// import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes , faPlus , faPlay } from '@fortawesome/free-solid-svg-icons';
import Episodes from './Episodes';
import getImage from '../utils/getImage';


// import usePreview from '../hooks/usePreview.js';

const Preview = ({ previewObj }) => {
	const itemData = previewObj.itemData;

	return(
		<div className='Preview'>
			<div className='background' />
			<div className='scrollable-wrapper' onClick={(e) => {if(e.target === e.currentTarget){previewObj.closePreview(false);}}}>
				<div className="popup">
					<button className='exit' onClick={() => {previewObj.closePreview(false);}}>
						<FontAwesomeIcon icon={faTimes}/>
					</button>
					<div className='img-wrapper'>
						<img className='poster' src={getImage(itemData.title+'/preview.jpg')} alt={itemData.title +' Poster'} onError={(e) => e.target.style.display = 'none'}/>
						<div className='button-container'>
							<img src={getImage(itemData.title+'/title.png')} alt={itemData.title +' Title'} onError={(e) => e.target.style.display = 'none'}/>
							<a href={'/watch/?type=' + itemData.type +'&path=' + encodeURIComponent(itemData.videopath)} className='button'>
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
						<Episodes itemData={itemData}/>
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