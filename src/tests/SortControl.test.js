import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';

import SortControl from '../components/SortControl';

describe('App SortControl', () => {
 
  it('select an option and passing the option properly ', () => {

    const mockCallback = jest.fn( (sortOption) => {
      return sortOption;
    });
    
    const {container} = render(<SortControl onChange={mockCallback}/>);
    const sortOption = container.getElementsByClassName('sortOption');

    fireEvent.click(sortOption[1]);
  
    expect(mockCallback(sortOption[1].value)).toBe(sortOption[1].value);
    expect(mockCallback.mock.calls).toHaveLength(1);
  
  });

});


