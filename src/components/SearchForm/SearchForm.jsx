import React, { useState } from "react";
import './SearchForm.css';
import Button from "../Button/Button";

const SearchForm = (props) => {

  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      props.onSearch(searchVal);
    }

    if (event.type === "focus") {
      props.onSearch('');
    }
  };

  const handleBtnClick = () => {
    props.onSearch(searchVal);
  }

  const inputHandler = (event) => {
    setSearchVal(event.target.value)
  }

  const showAddMovieForm = () => {
    props.showAddMovieForm('add', {})
  }

  return (
    <div className="searchWrapper">
      <div className="addMovieWrapper">
        <div className="addMovie" onClick={showAddMovieForm}>
          + Add movie
        </div>
      </div>
      <div className="searchInnerContent">
        <div className="findMovieLabel">Find your movie</div>
        <div className="searchInputRow">
          <div className="searchInput">
            <input
              type="search"
              data-testid="searchInput"
              placeholder="Search movie"
              onKeyDown={handleSearch}
              onFocus={handleSearch}
              onChange={inputHandler}
              value={searchVal}
            />
          </div>
          <div className="searchButton">
            <Button type="button" onClick={handleBtnClick}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  )

}
export default SearchForm;
