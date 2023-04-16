import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, within, fireEvent } from '@testing-library/react';

import MovieTiles from '../components/MovieTiles';
import { moviesAll } from '../mocks/Movies';

describe('App MovieTile', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('component renders all movies passed in props', () => {

    const {container} = render(<MovieTiles movies={moviesAll} />);
    const movieTile = container.getElementsByClassName('movieTile');

    expect(movieTile.length).toBe(10);
  
  });

  it('after a click event on a tile component calls "onClick" callback and passes correct movie in arguments', () => {
    
    const objInitialProps = {
      movies: moviesAll,
      onClick: jest.fn(),
      handleMovieClick: jest.fn()
    }

    const {container} = render(<MovieTiles {...objInitialProps} />);
    const {handleMovieClick} = objInitialProps;
    const movieTiles = container.getElementsByClassName('movieImage');

    fireEvent.click(movieTiles[1]);

    expect(handleMovieClick).toHaveBeenCalledTimes(1);
    expect(handleMovieClick).toBeCalledWith(
      expect.objectContaining({
        id: moviesAll[1].id
      })
    ); 
    
  });

});
