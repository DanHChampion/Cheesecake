import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card';

it('renders all items in Card.js successfully', () => {
	const mockItemData = {
		title: 'Breaking Bad'
	};
	const mockPreviewObj = {
		itemData: null,
		isOpen: null,
		openPreview: null,
		closePreview: null
	};

	render(<Card item={mockItemData} previewObj={mockPreviewObj}/>);

	const title = screen.getByText('Breaking Bad');
	expect(title).toBeInTheDocument();
	const coverPhotoElement = screen.getByRole('img');
	expect(coverPhotoElement).toBeInTheDocument();

});