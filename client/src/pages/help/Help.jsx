import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faFileLines } from '@fortawesome/free-solid-svg-icons';
import './Help.scss';

const Help = () => {

	const pages = [
		{
			name: 'Report a Bug',
			icon: faBug,
			description: 'Report any issues (certain features not working).',
			link: 'https://github.com/DanHChampion/Cheesecake/issues/new'
		},
		{
			name: 'Documentation',
			icon: faFileLines,
			description: 'Documentation for Cheesecake and how to use it.',
			link: 'https://github.com/DanHChampion/Cheesecake?tab=readme-ov-file#-installation-guide'
		}
	];

	return (
		<div className='Help'>
			<div className='container'>
			<h1>Help Centre</h1>
				{pages &&
					pages.map((page) => (
						<a className='item' href={page.link} target='_blank' key={page.name}>
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