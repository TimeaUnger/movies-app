import React from "react";
import './SortControl.css';

const SortControl = (props) => {

  const handleSortSelect = (e) => {

    const selectOption = e.target.value;
    props.handleSortSelection(selectOption);
  }

  return (
    <div className="sortControlWrapper">
      <span className="sortByLabel">SortBy</span>
      <span className="sortByControl">
        <select className="sortBySelect" onChange={handleSortSelect}>
          <option className="sortOption" value="release_date">Release Date</option>
          <option className="sortOption" value="title">Title</option>
        </select>
      </span>
    </div>
  )
}

export default SortControl;

