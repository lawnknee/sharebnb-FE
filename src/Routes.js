import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage.js";
import NotFound from "./Notfound";
import Listings from "./ListingsContainer";
import CreateListingForm from "./CreateListingForm";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import ListingDetails from "./ListingDetails.js";
import PrivateRoute from "./PrivateRoute";
import Messages from "./Messages.js";
import Conversation from "./Conversation.js";

/** Routes for Sharebnb App
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 *  Context:
 *      - UserContext
 *
 *  App -> Routes
 */

function Routes({ create, login, register, sendMessage }) {
  // console.debug(
  //   "Routes",
  //   `login=${typeof login}`,
  //   `register=${typeof register}`
  // );

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <Route exact path="/signup">
        <SignupForm register={register} />
      </Route>

      <Route exact path="/listings">
        <Listings />
      </Route>

      <Route exact path="/listing/:id">
        <ListingDetails sendMessage={sendMessage} />
      </Route>

      <PrivateRoute exact path="/listings/create">
        <CreateListingForm create={create} />
      </PrivateRoute>

      <PrivateRoute exact path="/messages">
        <Messages />
      </PrivateRoute>

      <PrivateRoute exact path="/conversation/:otherUser">
        <Conversation sendMessage={sendMessage} />
      </PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
