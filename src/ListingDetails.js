import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SharebnbApi from "./api";
// import "./ListingDetails.css"
import Loading from "./Loading";

/** ListingDetails renders details about a listing.
 *
 * State:
 *      - isLoading
 *      - listing
 *
 * Routes -> ListingDetails
 * Routed at /listing/:id
 */
function ListingDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState(null);

  useEffect(
    function getListingDetails() {
      async function fetchListing(id) {
        const listing = await SharebnbApi.getListing(id);
        setListing(listing);
        setIsLoading(false);
      }
      fetchListing(id);
    },
    [id]
  );

  if (isLoading) return <Loading />;
  //  host }
  console.log(listing);
  return (
    <div className="ListingDetails container pt-5">
      <div className="ListingDetails-header">
        <h2 className="text-start">{listing.title}</h2>
        <p className="text-start text-muted mb-1">
          {listing.city}, {listing.state}, {listing.country}
        </p>
        <img
          src={listing.photoUrl}
          alt={listing.title}
          className="ListingDetails-image rounded img-fluid"
        />
      </div>
      <div class="ListingDetails-body mt-5">
        <div class="row">
          <div class="col">
            <h3 className="text-start">
              {listing.details} hosted by {listing.host.firstName}{" "}
              {listing.host.lastName}
            </h3>
          </div>
          <div class="col">
            <h4>${listing.price} / night</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
