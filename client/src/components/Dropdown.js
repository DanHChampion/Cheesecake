import './Dropdown.css';

const Dropdown = () => {
	return(
		<div className="Dropdown">
			<a className='item' href='/users'>Change Profile</a>
			<a className='item' href='/help'>Help</a>
			<a className='item' href='/settings'>Settings</a>
		</div>
	);
};

export default Dropdown;