import { BrowserRouter } from "react-router-dom";
import 'bootswatch/dist/journal/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./App.css";
import Navigation from "./Navigation";
import Routes from "./Routes";
import SharebnbApi from "./api";

/** Sharebnb application.
 *
 *  App -> Routes
 */
function App() {

  /** Create a new listing: 
   *  listing object like
   *      { title, city, state, country, host_id, photoUrl, price, details }
   */

  async function createListing(listing) {
    await SharebnbApi.createListing(listing);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Routes create={createListing} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
