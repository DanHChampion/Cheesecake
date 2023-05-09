import './Profile.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {


	return (
		<div className='Profile'>
			<span>Edit Profile</span>
			<div className='wrapper'>
				<button>SAVE</button>
				<button>CANCEL</button>
				<button>DELETE USER</button>
			</div>
		</div>
	);
};

export default EditProfile;