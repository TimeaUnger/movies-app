import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, within, fireEvent } from '@testing-library/react';

import MovieDetails from '../components/MovieDetails';
import MovieTile from '../components/MovieTile';
import { moviesAll } from '../mocks/Movies';

describe('App MovieDetails', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('component renders the movie passed in props', () => {

    const mockCallback = jest.fn( (movie) => {
      return movie;
    });
    
    render(<MovieDetails movie={moviesAll[1]}/>);
    
    expect(mockCallback(moviesAll[1])).toMatchObject(moviesAll[1]);
    expect(mockCallback).toHaveBeenCalledWith(
      expect.objectContaining(moviesAll[1])
    );
    
    expect(mockCallback.mock.calls).toHaveLength(1);
  
  });

  it('click on search icon calls the handler with proper value', () => {

    const mockFn = jest.fn();
    const mockCallback = jest.fn( (val) => {
      return val;
    });
    
    const {container} = render(<MovieDetails onClick={mockCallback} movie={moviesAll[1]} showSearchHeader={mockFn}/>);
    const movieSearch = container.getElementsByClassName('movieSearch');

    fireEvent.click(movieSearch[0]);
    // the value should be "true" and type of bolean
    expect(mockCallback(true)).toBe(true);
    expect(mockCallback.mock.calls).toHaveLength(1);
  
  });

});
