import React, { useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MovieDetails from "../MovieDetails/MovieDetails";
import GenreSelect from "../GenreSelect/GenreSelect";
import SortControl from "../SortControl/SortControl";
import MovieTiles from "../MovieTiles/MovieTiles";

const MovieListPage = (props) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});

  const { formAction, genresUnique, sortSelected, movies, handleSortSelection } = props;

  const showSearchHeader = () =>{
    setShowMovieDetails(false);
  }

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    props.handleSearch(searchQuery);
    setActiveGenre('All')
  }
  
  const showDialogMovieForm = (action, movie) => {
    props.showDialogMovieForm(action, movie);
  }

  const handleGenreSelect = (selectedGenre) => {
    setActiveGenre(selectedGenre);
    props.showMoviesByGenre(selectedGenre);
  }

  const handleTileClick = (movieDetails) => {
    setMovieDetails(movieDetails);
    setShowMovieDetails(true);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  return (
    <div className='MovieListPage'>
      <div className="pageHeader">
        {showMovieDetails
            ? <MovieDetails 
                movie={movieDetails} 
                showSearchHeader={showSearchHeader} 
                showDialogMovieForm={showDialogMovieForm}
                setMovieFormEditDelete={showDialogMovieForm}
              />
            : <SearchForm 
                onSearch={handleSearch} 
                searchVal={searchQuery} 
                showAddMovieForm={showDialogMovieForm}
                formAction={formAction}
                handleSearch={handleSearch}
              />
        }
      </div>

      <div className="pageBody">
        <div className="selectSection">
          <GenreSelect 
            onSelect={handleGenreSelect} 
            genres={genresUnique} 
            activeGenre={activeGenre}
          />
          <SortControl handleSortSelection={handleSortSelection} />
        </div>
        {movies && 
          <MovieTiles 
            movies={movies} 
            handleMovieClick={handleTileClick} 
            sortSelected={sortSelected} 
            showDialogMovieForm={showDialogMovieForm}
          />}
      </div>
    </div>
  );
}

export default MovieListPage;