import './Notification.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faCircleQuestion , faGear, faFlask } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Notification = (props) => {

	return(
		<div className="Notification">
			{props.children}
			<div className='content'>
				Feature coming soon!
			</div>
		</div>
	);
};

Notification.propTypes = {
	children: PropTypes.object,
};

export default Notification;