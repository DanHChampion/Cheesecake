import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../NavBar';

it('renders all items in NavBar.js successfully', () => {
	const mockUser = {
		'id': '1',
		'name': 'Dan',
		'icon': 'https://i.pinimg.com/474x/d6/e2/b9/d6e2b92c45c41819cbd4000bb447c50e.jpg'
	};

	function mockSearch() {
		return
	}
	render(<NavBar searchFunction={mockSearch} userObject={mockUser} />);

	// Left Side Components
	const logoImgElement = screen.getAllByRole('img')[0];
	expect(logoImgElement).toBeInTheDocument();
	const homeElement = screen.getByText(/Home/i);
	expect(homeElement).toBeInTheDocument();
	const watchlistElement = screen.getByText(/Watchlist/i);
	expect(watchlistElement).toBeInTheDocument();
	const moviesElement = screen.getByText(/Movies/i);
	expect(moviesElement).toBeInTheDocument();
	const seriesElement = screen.getByText(/Series/i);
	expect(seriesElement).toBeInTheDocument();

	// Right Side Components
	const searchBarElement = screen.getByRole('textbox');
	expect(searchBarElement).toBeInTheDocument();
	const notificationsElement = screen.getByRole('notifications');
	expect(notificationsElement).toBeInTheDocument();
	// const profileImgElement = screen.getAllByRole('img')[1];
	// expect(profileImgElement).toBeInTheDocument();
});