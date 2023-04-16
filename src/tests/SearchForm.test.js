import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchForm from '../components/SearchForm';


describe('App SearchForm',  () => {

  it('after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', () => {
    
    const mockCallback = jest.fn( (searchVal) => {
        return searchVal;
    });
    
    render(<SearchForm searchVal="Star Wars" onSearch={mockCallback}/>);

    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, {target: {value: 'Search Query'}});
    const searchButton = screen.getByRole('button')
    fireEvent.click(searchButton);
    
    expect(mockCallback.mock.calls).toHaveLength(1);
    expect(mockCallback(searchInput.value)).toBe(searchInput.value);
  
  });

  it('after typing to the input and pressing Enter key, the "onChange" prop is called with proper value', () => {
    
    const mockCallback = jest.fn( (searchVal) => {
        return searchVal;
    });

    render(<SearchForm searchVal="Star Wars" onSearch={mockCallback}/>);

    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, {target: {value: 'Search Query'}});
    fireEvent.keyDown(searchInput, {key: 'enter', keyCode: 13});

    expect(mockCallback.mock.calls).toHaveLength(1);
    expect(mockCallback(searchInput.value)).toBe(searchInput.value);
  
  });

});


