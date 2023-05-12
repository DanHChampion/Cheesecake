import './Episodes.scss';
import apiRequest from '../hooks/apiRequest';
import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

const Episodes = ({itemData}) => {

	const [seasons, setSeasons] = useState([]);
	// const [selectedSeason, setSelectedSeason] = useState(null);
	const [episodes, setEpisodes] = useState(null);

	const getSeasons = () => {
		apiRequest().get( 'videos/series/seasons/'+itemData.title, (res, err) => {
			if(!err) {
				setSeasons(res.data);
				getEpisodes(res.data[0]);
			}
		});
	};

	const getEpisodes = (value) => {
		apiRequest().get( 'videos/series/'+itemData.title+'/'+value, (res, err) => {
			if(!err) {
				setEpisodes(res.data);
			}
		});
	};

	useEffect(() => {
		getSeasons();
	}, []);

	const handleChange = (value) => {
		console.log(value);
		getEpisodes(value);

	};

	return(
		<div className="Episodes">
			<select onChange={(e) => {handleChange(e.target.value);}}>
				{seasons &&
					seasons.map((season) => (
						<option value={season} key={season}> {season}</option>
					))
				}
			</select>
			<div className='container'>
				{episodes &&
					episodes.map((episode) => (
						<div key={episode.episode}>
							<a href={'/watch/?type=series&path=' + encodeURIComponent(episode.videopath)}>{episode.videopath}</a>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default Episodes;

Episodes.propTypes = {
	itemData: PropTypes.object.isRequired,
};
