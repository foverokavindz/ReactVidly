import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <Link class="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <NavLink class="nav-link " aria-current="page" to="/movies">
              Movies
            </NavLink>
            <NavLink class="nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink class="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
