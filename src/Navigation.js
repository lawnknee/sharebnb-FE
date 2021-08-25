import { NavLink } from "react-router-dom";
import "./Navigation.css";
import React from "react";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site.
 * When not logged in, shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation() {
  return (
    <nav className="Navbar navbar navbar-dark bg-primary d-flex bd-highlight mb-4">
      <div className="me-auto pl-0 bd-highlight navbar-brand">
        <NavLink exact to="/">
          Sharebnb
        </NavLink>
      </div>
      <div className="me-0 bd-highlight">
        <NavLink exact to="/listings">
          Listings
        </NavLink>
      </div>
      <div className="me-0 bd-highlight">
        <NavLink exact to="/listings/create">
          Become a host
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
