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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function storeUser() {
      async function fetchUser() {
        // only fetch a user if a token is stored
        if (token) {
          // If invalid token, log out user
          try {
            // store token from login/register process to SharebnbApi class and localStorage
            SharebnbApi.token = token;
            localStorage.token = token;
            let { username } = jwt.decode(token);
            let user = await SharebnbApi.getUser(username);
            setCurrentUser(user);
          } catch {
            console.log("INVALID TOKEN RECEIVED");
            logout();
          }
        }
        setIsLoading(false);
      }
      setIsLoading(true);
      fetchUser();
    },
    [token]
  );

  /** Register user:
   *    user object like
   *      { firstName, lastName, email, username, password}
   */
  async function register(user) {
    let token = await SharebnbApi.register(user);
    setToken(token);
  }

  /** Login user:
   *  Takes object like { username, password }
   */
  async function login({ username, password }) {
    let token = await SharebnbApi.login(username, password);
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

  /** Send a message.
   * data object like { fromUserId, toUserId, body}
   */
  async function sendMessage(data) {
    await SharebnbApi.sendMessage(data);
  }

  /** Get all messages for a user by userId. */
  // async function getMessages(currentUser) {
  //   let messages = SharebnbApi.getMessages(currentUser.id);
  // }

  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="App">
            <Navigation logout={logout} />
            <Routes
              login={login}
              register={register}
              create={createListing}
              sendMessage={sendMessage}
            />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
