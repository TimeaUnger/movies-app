import React, { useState, useEffect} from "react";
import './GenreSelect.css';

const GenreSelect = (props) => {

    const onSelectHandler = (event) => {
      const genre = event.target.innerHTML;
      props.onSelect(genre) 
    }

    return (
      <div className="genreSelect">
        <ul data-testid="GenreListItem" aria-label="genresAll">
          {props.genres.map((genre, index) => {
            return (
              <li
                key={index} 
                onClick={onSelectHandler}
                className={`genreItem ${props.activeGenre === genre && 'active'}`}
              >
                { genre }
              </li>
            )
          })}
        </ul>
      </div>
    );
}

export default GenreSelect;
