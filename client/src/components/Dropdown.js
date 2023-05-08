import './Dropdown.scss';

const Dropdown = () => {

	const logOut = () => {
		sessionStorage.clear();
	};

	return(
		<div className="Dropdown">
			<a className='item' onClick={() => {logOut;}} href='/users'>Change Profile</a>
			<a className='item' href='/help'>Help</a>
			<a className='item' href='/settings'>Settings</a>
		</div>
	);
};

export default Dropdown;