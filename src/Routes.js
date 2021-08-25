import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage.js";
import NotFound from "./Notfound";
import Listings from "./ListingsContainer";
import CreateListingForm from "./CreateListingForm"

/** Routes for Sharebnb App
 * 
 *  Context:
 *      - UserContext
 *
 *  App -> Routes
 */

function Routes({ create }) {
  return(
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/listings">
        <Listings />
      </Route>
      <Route exact path="/listings/create">
        <CreateListingForm create={create}/>
      </Route>
     <Route><NotFound /></Route>
    </Switch>
  );
}

export default Routes;