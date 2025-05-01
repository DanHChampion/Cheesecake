import { useState } from 'react';

export default function usePreview() {
	const [itemData, setItemData] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const openPreview = (item) => {
		setItemData(item);
		setIsOpen(true);
	};

	const closePreview = () => {
		setIsOpen(false);
	};

	return {
		itemData: itemData,
		isOpen: isOpen,
		openPreview: openPreview,
		closePreview: closePreview
	};
}