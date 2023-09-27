import './Dropdown.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleQuestion , faGear, faFlask } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Dropdown = (props) => {

	const logOut = () => {
		localStorage.clear();
	};

	return(
		<div className="Dropdown">
			{props.children}
			<div className='content'>
				<a className='item' onClick={() => {logOut();}} href='/users'><FontAwesomeIcon icon={faUser}/>Change Profile</a>
				<a className='item' href='/experimental'><FontAwesomeIcon icon={faFlask}/>Experimental</a>
				<a className='item' href='/help'><FontAwesomeIcon icon={faCircleQuestion}/>Help</a>
				<a className='item' href='/settings'><FontAwesomeIcon icon={faGear}/>Settings</a>
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	children: PropTypes.object,
};

export default Dropdown;