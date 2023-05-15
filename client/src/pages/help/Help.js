import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle , faClipboardQuestion , faBug, faFileLines } from '@fortawesome/free-solid-svg-icons';
import './Help.scss';

const Help = () => {

	const pages = [
		{
			name: 'About',
			icon: faInfoCircle,
			description: 'Information about this website and its creator and more...',
			link: '/about'
		},
		{
			name: 'Request for Movies/Series',
			icon: faClipboardQuestion,
			description: 'Submit titles to be added to Cheesecake.',
			link: '/request'
		},
		{
			name: 'Report a Bug',
			icon: faBug,
			description: 'Report any issues (missing information, images or features not working).',
			link: '/report'
		},
		{
			name: 'Documentation',
			icon: faFileLines,
			description: 'Documentation for the REST API used in the backend.',
			link: '/docs'
		}
	];

	return (
		<div className='Help'>
			<h1>Help Centre</h1>
			<div className='container'>
				{pages &&
					pages.map((page) => (
						<a className='item' href={page.link} key={page.name}>
							<FontAwesomeIcon className='icon' icon={page.icon}/>
							<p className='name'>{page.name}</p>
							<p className='description'>{page.description}</p>
						</a>
					))
				}
			</div>
		</div>
	);
};

export default Help;