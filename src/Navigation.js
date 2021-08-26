import { NavLink } from "react-router-dom";
import "./Navigation.css";
import React, { useContext } from "react";
import UserContext from "./UserContext";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site.
 * When not logged in, shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
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
        <div className="me-0 bd-highlight">
          <NavLink exact to="/" onClick={logout}>
            Log out
          </NavLink>
        </div>
      </nav>
    );
  }

  function loggedOutNav() {
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
          <NavLink exact to="/login">
            Login
          </NavLink>
        </div>
        <div className="me-0 bd-highlight">
          <NavLink exact to="/signup">
            Sign Up
          </NavLink>
        </div>
      </nav>
    );
  }

  return <div>{currentUser ? loggedInNav() : loggedOutNav()}</div>;
}

export default Navigation;
