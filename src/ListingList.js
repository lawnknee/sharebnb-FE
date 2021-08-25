import ListingCard from "./ListingCard"

/** Renders list of listings
 *
 * Props:
 *  - listings: array of listing objects like:
 *      [ { id, title, city, price, photoPath, details }, ...]
 *
 * ListingsContainer -> ListingList -> ListingCard
 */

function ListingList({ listings }) {
  return (
    <div className="ListingList">
      {listings.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}

export default ListingList