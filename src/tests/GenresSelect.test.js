// 1. Test that component renders all genres passed in props
// 2. Test that component highlights a selected genre passed in props
// 3. Test that after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments

import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, within, fireEvent } from '@testing-library/react';

import GenreSelect from '../components/GenreSelect';

describe('App GenresSelect', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  const genresAll = [
    "All", 
    "Drama", 
    "Romance",
    "Animation",
    "Adventure", 
    "Family",
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action"
  ];

  it('component renders all genres passed in props', () => {

    render(<GenreSelect genres={genresAll} />);

    const list = screen.getByRole("list", {
      name: /genresAll/i,
    });

    const { getAllByRole } = within(list);
    const genreItem = getAllByRole("listitem")

    expect(genreItem.length).toBe(10)

  });

  it('component highlights a selected genre passed in props', () => {

    const mockFnOnSelect = jest.fn();

    render(<GenreSelect genres={genresAll}  onSelect={mockFnOnSelect} />);
    const list = screen.getByRole("list", {
      name: /genresAll/i,
    });

    const { getAllByRole } = within(list);
    const genreItem = getAllByRole("listitem");

    fireEvent.click(genreItem[1]);

    expect(mockFnOnSelect).toHaveBeenCalledTimes(1)

  });

  it('after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', () => {
    
    const mockFn = jest.fn();
    const mockCallback = jest.fn( genre => {
      return genre;
    });

    render(<GenreSelect genres={genresAll} onClick={mockCallback} onSelect={mockFn}/>);

    const list = screen.getByRole("list", {
      name: /genresAll/i,
    });

    const { getAllByRole } = within(list);
    const genreItem = getAllByRole("listitem");

    fireEvent.click(genreItem[1]);

    expect(mockCallback(genreItem[1].textContent)).toBe(genreItem[1].textContent); 
    expect(mockCallback.mock.calls).toHaveLength(1);

  });

});
