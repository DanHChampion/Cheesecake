import './Preview.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes , faPlus , faPlay } from '@fortawesome/free-solid-svg-icons';
import Episodes from './Episodes';
import getImage from '../utils/getImage';
import tmdbApi from '../hooks/tmdbApi';

const Preview = ({ previewObj }) => {
	const itemData = previewObj.itemData;
	const index = 5;
	const type = itemData.type === 'movie'? 'movie' : 'tv';
	const name = itemData.title.substring(0, itemData.title.lastIndexOf(' '));

	const [apiData, setApiData] = useState();
	const [credits, setCredits] = useState();
	const [keywords, setKeywords] = useState();

	useEffect(() => {
		const searchEndpoint = 'search/'+ type +'?query='+encodeURIComponent(name)+'&';
		console.log(searchEndpoint);
		tmdbApi().get( searchEndpoint, (res, err) => {
			if(!err) {
				setApiData(res.data.results[0]); // Get first result
				const creditsEndpoint = type +'/'+ res.data.results[0].id +'/credits?';
				tmdbApi().get( creditsEndpoint, (res, err) => {
					if(!err) {
						console.log(res.data);
						setCredits(res.data.cast.slice(0, index));
					}
				});
				const keywordsEndpoint = type +'/'+ res.data.results[0].id +'/keywords?';
				tmdbApi().get( keywordsEndpoint, (res, err) => {
					if(!err) {
						console.log(res.data);
						if (type === 'movie') setKeywords(res.data.keywords.slice(0, index));
						if (type === 'tv') setKeywords(res.data.results.slice(0, index));
					}
				});
			}
		});
	}, []);

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
					{apiData &&
						<div className='video-info'>
							<div className='left container'>
								<span className='name'>{name}</span>
								<span className='year'>{ type==='movie'? apiData.release_date.slice(0, 4) : apiData.first_air_date.slice(0, 4) }</span>
								<span className='overview'>{apiData.overview}</span>
							</div>
							<div className='right container'>
								<span>Cast:</span>
								<ul className='list'>
									{credits && credits.map((member) => (
										<li className='item on' key={member.id}>{member.name}</li>
									))
									}
								</ul>
								<span>Keywords:</span>
								<ul className='list'>
									{keywords && keywords.map((keyword) => (
										<li className='item on' key={keyword.id}>{keyword.name}</li>
									))
									}
								</ul>
							</div>
						</div>
					}
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