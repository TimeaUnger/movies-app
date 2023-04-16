import React from "react";
import './MenuHamburger.css';

const MenuHamburger = () => {

  return (
    // <meta name="viewport" content="width=device-width, initial-scale=1">
    <div className="editDeleteMenuWrapper">
      <section className="top-nav">
        <input id="menu-toggle" type="checkbox" />
        <label className='menu-button-container' for="menu-toggle">
          <div className='menu-button'></div>
        </label>
        {/* <ul className="menu">
          <li>Edit</li>
          <li>Delete</li>
        </ul> */}
      </section>
    </div>
  )
}

export default MenuHamburger;