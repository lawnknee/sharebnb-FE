import React, { useState, useEffect } from "react";
import SharebnbApi from "./api";
import Loading from "./Loading";
import ListingList from "./ListingList";
import SearchForm from "./SearchForm";

// import SearchForm from "../common/SearchForm";

/** Listing Component: renders page with all listings.
 *
 * On mount, loads all listings from API.
 * Can search through listings by title.
 *
 * State:
 *    - listings: array of listing objects like:
 *        [ { id, title, city, price, photoPath, details }, ...]
 *    - isLoading: is listing info currently being pulled from API?
 *
 * This is routed to at /listings
 *
 * Routes -> Listings
 */

function ListingsContainer() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getAllListings() {
    async function fetchListings() {
      const listings = await SharebnbApi.getListings();
      setListings(listings);
      setIsLoading(false);
    }
    fetchListings();
  }, []);

  async function fetchFilteredListings(location) {
    const listings = await SharebnbApi.getListingsBySearch(location);
    setListings(listings);
    setIsLoading(false);
  }

  if (isLoading) return <Loading />;

  return (
    <div className="ListingsContainer container">
      <SearchForm search={fetchFilteredListings} />
      <ListingList listings={listings} />
    </div>
  );
}

export default ListingsContainer;
