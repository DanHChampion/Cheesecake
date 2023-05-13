import NavBar from '../../components/NavBar';
import './Experimental.scss';
import { useState } from 'react';

const Experimental = () => {

	const [iframeURL, setIframeURL] = useState();

	return (
		<div className='Experimental'>
			<NavBar/>
			<div className='search'>
				<input id='url' type='text' onClick={(e) => {setIframeURL(e.target.value);}}/>
				<label htmlFor='url'>Search</label>
			</div>

			<div className='iframe-wrapper'>
				<iframe src={iframeURL}/>
			</div>
		</div>
	);
};

export default Experimental;