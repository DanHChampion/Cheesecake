import './Settings.scss';
import { useState } from 'react';

const Settings = () => {

	const [selection, setSelection] = useState('About');
	const pages = ['About', 'Request for Movies/Series', 'Report A Bug', 'Documentation'];

	return (
		<div className='Settings'>
			<div className='main'>
				<div className='left container'>
					{pages &&
						pages.map((page) => (
							<div className={page === selection?'selector active':'selector'} key={page} onClick={() => {setSelection(page);}}>{page}</div>
						))
					}
				</div>
				<div className='right container'>
					{selection === 'About' &&
						<span>About</span>
					}
					{selection === 'Request for Movies/Series' &&
						<span>Request for Movies/Series</span>
					}
					{selection === 'Report A Bug' &&
						<span>Report A Bug</span>
					}
					{selection === 'Documentation' &&
						<span>Documentation</span>
					}
				</div>
			</div>
		</div>
	);
};

export default Settings;