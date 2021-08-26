import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

import Navigation from "./Navigation";
import Routes from "./Routes";
import SharebnbApi from "./api";
import Loading from "./Loading";
import UserContext from "./UserContext";

/** Sharebnb application.
 *
 *  After sucessful login or register, token gets stored in state/localStorage.
 *  Current user retrieved from token, and passed down via context.
 *
 *  States:
 *    - token
 *    - currentUser
 *    - infoLoaded
 *
 *  Context:
 *    - creates UserContext
 *
 *  App -> { Navigation, Routes }
 */
function App() {
  const [token, setToken] = useState(localStorage.token);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(
  //   function storeUser() {
  //     async function fetchUser() {
  //       // only fetch a user if a token is stored
  //       if (token) {
  //         // store token from login/register process to SharebnbApi class and localStorage
  //         SharebnbApi.token = token;
  //         localStorage.token = token;

  //         let { id } = jwt.decode(token);
  //         let user = await SharebnbApi.getUser(id);

  //         setCurrentUser(user);
  //       }
  //       setIsLoading(false);
  //     }
  //     setIsLoading(true)
  //     fetchUser();
  //   },
  //   [token]
  // );

  /** Register user:
   *    user object like
   *      { firstName, lastName, email, password}
   */
  async function register(user) {
    let token = await SharebnbApi.register(user);
    setToken(token);
  }

  /** Login user:
   *  Takes object like { email, password }
   */
  async function login({ email, password }) {
    let token = await SharebnbApi.login(email, password);
    setToken(token);
  }

  /** Logout user. */

  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.clear();
  }

  /** Create a new listing:
   *  listing object like
   *      { title, city, state, country, host_id, photoUrl, price, details }
   */

  async function createListing(listing) {
    await SharebnbApi.createListing(listing);
  }

  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <BrowserRouter>
        {/* <UserContext.Provider value={{ currentUser, setCurrentUser }}> */}
          <div className="App">
            <Navigation logout={logout} />
            <Routes login={login} register={register} create={createListing} />
          </div>
        {/* </UserContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
