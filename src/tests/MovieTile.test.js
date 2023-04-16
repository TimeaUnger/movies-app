import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';

import MovieTile from '../components/MovieTile';
import { moviesAll } from '../mocks/Movies';

describe('App MovieTile', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('component renders movie tile passed in props', () => {

    render(<MovieTile movieDetails={moviesAll[1]} />);

    const movieTileTitle = screen.getByText(moviesAll[1].title);
    const movieTileGenres = screen.getByText(moviesAll[1].genres.join(", "));

    expect(movieTileTitle).toBeInTheDocument();
    expect(movieTileGenres).toBeInTheDocument();
  
  });

  it('menu button opens the edit/delete block', () => {

    const objInitialProps = {
      movieDetails: moviesAll[1],
      onClick: jest.fn()
    }

    const result = render(<MovieTile {...objInitialProps} />);
    const menuButton = result.container.querySelector('#navButton');
    fireEvent.click(menuButton);

    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  
  });

  it('menu option "delete" calls the handler with correct props', () => {

    const objInitialProps = {
      movieDetails: moviesAll[1],
      onClick: jest.fn(),
      handleMenuButton: jest.fn(),
      handleMovieAction: jest.fn()
    }

    const {handleMovieAction} = objInitialProps;
    const result = render(<MovieTile {...objInitialProps} />);

    const menuButton = result.container.querySelector('#navButton');
    fireEvent.click(menuButton);

    const deleteMovie = result.container.querySelector('#deleteMovie');
    fireEvent.click(deleteMovie);

    expect(handleMovieAction).toHaveBeenCalledTimes(1);
    expect(handleMovieAction).toBeCalledWith("delete",
      expect.objectContaining({
        id: moviesAll[1].id
      })
    ); 
  
  });

  it('menu option "edit" calls the handler with correct props', () => {

    const objInitialProps = {
      movieDetails: moviesAll[1],
      onClick: jest.fn(),
      handleMenuButton: jest.fn(),
      handleMovieAction: jest.fn()
    }

    const {handleMovieAction} = objInitialProps;
    const result = render(<MovieTile {...objInitialProps} />);
    
    const menuButton = result.container.querySelector('#navButton');
    fireEvent.click(menuButton);

    const editMovie = result.container.querySelector('#editMovie');
    fireEvent.click(editMovie);

    expect(handleMovieAction).toHaveBeenCalledTimes(1);
    expect(handleMovieAction).toBeCalledWith("edit",
      expect.objectContaining({
        id: moviesAll[1].id,
        title: moviesAll[1].title,
        genres: moviesAll[1].genres,
      })
    ); 
  
  });

});