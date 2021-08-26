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

  const {
    id,
    title,
    city,
    state,
    photoUrl,
  } = listing;

  return (
    <div className="ListingCard container mb-4">
      <Link
        to={`/listing/${id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="ListingCard-card card mt-5">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <small className="card-text">{city}, {state}</small>
          </div>
          {photoUrl && (
            <img src={photoUrl} alt={title}></img>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
