import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { createRoot } from 'react-dom/client';
import NavBar from '../NavBar';

it('renders all items NavBar.js successfully', () => {
	const mockUser = {
		'id': '1',
		'name': 'Dan',
		'icon': 'https://i.pinimg.com/474x/d6/e2/b9/d6e2b92c45c41819cbd4000bb447c50e.jpg'
	};

	render(<NavBar userObject={mockUser} />);
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
	// const searchBarElement = screen.getByRole('textbox'); IT IS NOW HIDDEN
	// expect(searchBarElement).toBeInTheDocument();
	const searchElement = screen.getByRole('button');
	expect(searchElement).toBeInTheDocument();
	// const notificationsElement = screen.getByText(/Notifications/i); NOW REPLACED WITH ICON
	// expect(notificationsElement).toBeInTheDocument();
	const profileImgElement = screen.getAllByRole('img')[1];
	expect(profileImgElement).toBeInTheDocument();
});