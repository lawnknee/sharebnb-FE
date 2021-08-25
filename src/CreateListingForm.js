import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateListingForm.css";
import UploadImageToS3WithNativeSdk from "./UploadImageToS3WIthNativeSdk";

/** Renders a form to post a new listing
 *
 *  After submitting form:
 *      - calls parent func to update API with new listing
 *      - redirect to /listings
 *
 *  State:
 *      - formData
 *      - errors
 *
 *  Context:
 *      - UserContext
 *
 *  Inaccessible if not logged in.
 *
 *  App -> Routes -> CreateListingForm
 *  Routed at /listings/create
 */
function CreateListingForm({ create }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    state: "",
    country: "",
    photo_url: "",
    price: "",
    details: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "CreateListingForm",
    "Create=",
    typeof create,
    "formData=",
    formData,
    "formErrors",
    formErrors
  );

  /** Handle form submit:
   *
   *  Calls create func prop and, if successful, redirects to /listings
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    formData['host_id'] = 1;

    try {
      await create(formData);
    } catch (err) {
      setFormErrors(err);
    }
    history.push("/listings");
  }

  /** Update form data field */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="CreateListingForm pt-5">
      <form
        onSubmit={handleSubmit}
        className="CreateListingForm-form container"
      >
        {formErrors.length > 0 &&
          formErrors.map((error) => (
            <div key={error} className="alert alert-danger">
              <strong>{error}</strong>
            </div>
          ))}

        <div className="CreateListingForm-card card">
          <h1 className="CreateListingForm-title">Create a new listing</h1>
          <div className="CreateListingForm-body card-body">
            <div className="form-group mb-4">
              <label htmlFor="title" className="form-label">
                Listing title:{" "}
              </label>
              <input
                id="title"
                name="title"
                className="form-control"
                onChange={handleChange}
                value={formData.title || ""}
                aria-label="Listing title"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="city" className="form-label">
                City:{" "}
              </label>
              <input
                id="city"
                name="city"
                className="form-control"
                onChange={handleChange}
                value={formData.city || ""}
                aria-label="Listing city"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="state" className="form-label">
                State:{" "}
              </label>
              <input
                id="state"
                name="state"
                className="form-control"
                onChange={handleChange}
                value={formData.state || ""}
                aria-label="Listing state"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="country" className="form-label">
                Country:{" "}
              </label>
              <input
                id="country"
                name="country"
                className="form-control"
                onChange={handleChange}
                value={formData.country || ""}
                aria-label="Listing country"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="price" className="form-label">
                Price per night:
              </label>
              <div className="form-group">
                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.price || ""}
                    aria-label="Price amount (to the nearest dollar)"
                    required
                  />
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="details" className="form-label">
                Listing details:{" "}
              </label>
              <input
                id="details"
                name="details"
                type="textarea"
                rows="5"
                className="form-control"
                onChange={handleChange}
                value={formData.details || ""}
                aria-label="Listing details"
                required
              />
            </div>

            {/* <div className="form-group mb-4">
              <label htmlFor="photo_url" className="form-label">
                Upload a photo:
              </label>
              <input
                id="photo_url"
                name="photo_url"
                type="file"
                className="form-control"
                onChange={handleChange}
                value={formData.photo_url}
              />
            </div> */}

            <UploadImageToS3WithNativeSdk />

            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateListingForm;
