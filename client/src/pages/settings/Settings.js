import './Settings.scss';
// import { useState } from 'react';

const Settings = () => {

	// const [selection, setSelection] = useState('About');
	// const pages = ['About', 'Request for Movies/Series', 'Report A Bug', 'Documentation'];

	return (
		<div className='Settings'>
			<div className='main'>
				<div className='header'>
					<span>Settings</span>
				</div>
				<section>
					<div className='left-section'>
						<h2>Appearance</h2>
					</div>
					<div className='right-section'>
						<label className="switch">
							<input type="checkbox"/>
							<span className="slider"></span>
						</label>
					</div>
				</section>
				<section>
					<div className='left-section'>
						<h2>Misc</h2>
					</div>
					<div className='right-section'>
						<a href='/'> banana</a>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Settings;