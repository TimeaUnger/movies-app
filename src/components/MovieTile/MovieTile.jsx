import React from "react";
import './MovieTile.css';
import defaultImage from '../../assets/image-placeholder.jpg';
import { useState } from 'react';
import '../MenuHamburger/MenuHamburger';

const MovieTile = (props) => {

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState('');

  const showDetails = (movieDetails) => {
      props.handleMovieClick(movieDetails)
  }

  const handleAction = (action) => {
    props.showDialogMovieForm(action, props.movieDetails);
  }

  const handleMenuButton = () => {

    if(!isVisible){
      setIsVisible(true)
      setIsOpen('open')
    }
    else{
      setIsVisible(false)
      setIsOpen('')
    }

  }

  const {title, release_date, genres, poster_path } = props.movieDetails;
 
  return (

    <div className="movieTileWrapper">
      <div className="editDeleteBlock">
      {isVisible &&
        <div className="editDeleteRowsWrapper">
          <div className="editMovieRow" id="editMovie" onClick={()=> handleAction('edit')}>Edit</div>
          <div className="deleteMovieRow" id="deleteMovie" onClick={()=> handleAction('delete')}>Delete</div>
        </div>
       }
       <div className="editDeleteMenuWrapper">
          <div className="top-nav" id="navButton" onClick={handleMenuButton}>
            <div className={`menu-toggle ${isOpen}`} id="menu-toggle"></div>
            <div className='menu-button-container' >
              <div className='menu-button'></div>
            </div>
          </div>
        </div>
      </div> 
      <div className="movieTile">
        <div 
          className="movieImage" 
          onClick={()=> showDetails(props.movieDetails)}
        >
          <img src={poster_path} alt={title} 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=`${defaultImage}`;
            }}
            
          />
        </div>
        <div className="movieTileDetails">
          <div className="movieTitleWrapper">
            <div className="movieTitle">{title}</div>
            <div className="releaseDate">{release_date.substr(0, 4)}</div>
          </div>
        </div>
          <div className="movieGenre">{genres.join(", ")}</div>
      </div>
    </div>
  );
}

export default MovieTile;