import { Link } from "react-router-dom";

/** Renders a single Listing Component
 *  Contains information about the listing
 *
 * Props:
 *  - listing: an objec like : { id, title, city, state, country, host_id, photoPath, price, details, host }
 *      where host is [{ id, firstName, lastName }]
 *
 * ListingList -> ListingCard
 */

function ListingCard({ listing }) {
  const { id, title, city, state, photoUrl, price } = listing;

  return (
    <div className="ListingCard mb-4">
      <Link to={`/listing/${id}`} style={{ textDecoration: "none" }}>
        <div className="ListingCard-card card mt-5">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
          </div>
          {photoUrl && <img src={photoUrl} alt={title} className="img-fluid"></img>}
          <p className="card-text text-start ps-2">
            {city}, {state}
            <br /> ${price} / night
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
