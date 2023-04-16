import React from 'react';
import ReactDOM from "react-dom";
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../components/Dialog';

describe('App Dialog', () => {

		beforeAll(() => {
				ReactDOM.createPortal = jest.fn((element, node) => {
					return element;
				});
		});
		
		afterEach(() => {
				ReactDOM.createPortal.mockClear();
		});
	
		it('renders Dialog component with children', () => {

				const {container} = render(<Dialog>Dialog content</Dialog>);

				const dialogContainer = container.getElementsByClassName('dialog-container');
				const childrenContainer = container.getElementsByClassName('modal');
				const modalText = screen.getByText('Dialog content');

				expect(dialogContainer).toHaveLength(1);
				expect(childrenContainer).toHaveLength(1);
				expect(modalText).toBeInTheDocument();
		
		});

		it('calls callback function to close the dialog', () => {
		
				const mockFn = jest.fn()
				const {container} = render(<Dialog handleCloseModal={mockFn}/>);
				const closeButton = container.getElementsByClassName('closeButton');

				fireEvent.click(closeButton[0]);

				expect(mockFn.mock.calls).toHaveLength(1);

		});

});
