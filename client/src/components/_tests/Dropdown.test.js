import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '../Dropdown';

it('renders all items in Dropdown.js successfully', () => {
	const mockUser = {
		'id': '1',
		'name': 'Dan',
		'icon': 'https://i.pinimg.com/474x/d6/e2/b9/d6e2b92c45c41819cbd4000bb447c50e.jpg'
	};

	render(<Dropdown>
		<div className='img-wrapper'>
			<img src={mockUser? mockUser.icon : './default.png'} alt='Profile' />
		</div>
	</Dropdown>);

	// NavBarElement
	const profileImgElement = screen.getByRole('img');
	expect(profileImgElement).toBeInTheDocument();

	// Content
	const changeProfileElement = screen.getByText(/Change Profile/i);
	expect(changeProfileElement).toBeInTheDocument();
	const experimentalElement = screen.getByText(/Experimental/i);
	expect(experimentalElement).toBeInTheDocument();
	const helpElement = screen.getByText(/Help/i);
	expect(helpElement).toBeInTheDocument();
	const settingsElement = screen.getByText(/Settings/i);
	expect(settingsElement).toBeInTheDocument();

});