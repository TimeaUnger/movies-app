import React from "react";
import './MovieTiles.css';
import MovieTile from '../MovieTile/MovieTile';

const MovieTiles = (props) => {

  const showMovieDetails = (movie) => {
      props.handleMovieClick(movie)
  }

  const showDialogMovieForm = (action, movie) => {
      props.showDialogMovieForm(action, movie);
  }

  return (
    <>
      <div className="foundMoviesWrapper">
        <div className="foundMovies">
            <span className="foundMoviesNr">{props.movies?.length}</span>
            <span className="foundMoviesTitle">movies found</span>
        </div>
      </div>
      <div className="movieListContentWrapper">
        <div className="movieTilesWrapper">
          {
            props.movies?.map((movie) => {
              return (
                <MovieTile 
                  movieDetails={movie} 
                  handleMovieClick={showMovieDetails} 
                  key={movie.id}
                  showDialogMovieForm={showDialogMovieForm}
                />
              )
            })}
        </div>
      </div>
    </>
  );
}

export default MovieTiles;