import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SharebnbApi from "./api";
// import "./ListingDetails.css"
import Loading from "./Loading";
import UserContext from "./UserContext";

/** ListingDetails renders details about a listing.
 *
 * State:
 *      - isLoading
 *      - listing
 *
 * Routes -> ListingDetails
 * Routed at /listing/:id
 */
function ListingDetails({ sendMessage }) {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
  });
  const [alert, setAlert] = useState([]);

  useEffect(
    function getListingDetails() {
      let mounted = true;
      if (mounted) {
        async function fetchListing(id) {
          const listing = await SharebnbApi.getListing(id);
          setListing(listing);
          setIsLoading(false);
        }
        fetchListing(id);
      }
      return () => (mounted = false);
    },
    [id]
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    let data = {
      ...formData,
      username: currentUser.username,
      toUser: listing.host.username,
    };

    try {
      await sendMessage(data);
    } catch (err) {
      setAlert(err);
    }
    // document.getElementById("messageModal").modal('hide');
    setAlert([...alert, "Message sent!"]);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  if (isLoading) return <Loading />;

  return (
    <div className="ListingDetails container pt-5">
      <div className="ListingDetails-header">
        {alert.length > 0 &&
          alert.map((a) => (
            <div key={a} className="alert alert-info">
              <strong>{a}</strong>
            </div>
          ))}
        <h2 className="text-start">{listing.title}</h2>
        <p className="text-start text-muted mb-1">{listing.location}</p>
        <img
          src={listing.image}
          alt={listing.title}
          className="ListingDetails-image rounded img-fluid"
        />
      </div>
      <div className="ListingDetails-body mt-5">
        <div className="row">
          <div className="col">
            <h3 className="text-start">
              {listing.description} hosted by {listing.host.firstName}{" "}
              {listing.host.lastName}
            </h3>
          </div>
          <div className="col">
            <h4>${listing.price} / night</h4>

            {currentUser ? (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#messageModal"
                data-bs-host={listing.host}
              >
                Contact host
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Sign in to contact host
              </Link>
            )}

            <div
              className="modal fade"
              id="messageModal"
              tabIndex="-1"
              aria-labelledby="Contact Host"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="messageModal">
                      New message to {listing.host.firstName}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="sender-name" className="col-form-label">
                          From:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="sender-name"
                          value={currentUser.username}
                          onChange={handleChange}
                          required
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Message:
                        </label>
                        <textarea
                          name="text"
                          className="form-control"
                          id="message-text"
                          onChange={handleChange}
                          value={formData.text}
                          rows="5"
                          required
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          data-bs-dismiss="modal"
                          className="btn btn-primary"
                        >
                          Send message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
