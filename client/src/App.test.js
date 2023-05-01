import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { createRoot } from 'react-dom/client';
import App from './App.js';

test('Asserts that 1 is equal to 1', () => {
	expect(1).toEqual(1);
});