import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateListingForm.css";

/** Renders a form to post a new listing.
 *
 *  Form encoding type: multipart/form-data
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
    location: "",
    image: null,
    price: "",
    description: "",
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
   *  Calls create func prop and, if successful, redirects to /listings.
   *
   *  Form uses multipart/form-data content-type so the browser will
   *    create a "multipart" message where each part will contain a
   *    field of the form. A multipart message will consist of text input
   *    and file input, allowing us to submit the form and file.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    // formData["username"] = 1; TODO: Figure out later

    /** To send multipart/form-data with Axios, we need to create a form,
     * and append the file to it. We don't have access to the FormData
     * interface in Node.js as we do in the browser, so we will be using
     * the FormData class.
     *
     * FormData() converts the data input in the form into key-value pairs
     * to create a multipart/form-data object.
     *
     * First, we create a new instance and use append(name, value) method
     * to add a file and additional fields.
     *
     */
    let data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await create(data);
    } catch (err) {
      setFormErrors(err);
    }
    history.push("/listings");
  }

  /** Update form data field */

  function handleChange(evt) {
    const { name, value } = evt.target;
    const file = evt.target.files;

    if (file) {
      setFormData((data) => ({ ...data, [name]: value, image: file[0] }));
    } else {
      setFormData((data) => ({ ...data, [name]: value }));
    }
  }

  return (
    <div className="CreateListingForm pt-5">
      <form
        onSubmit={handleSubmit}
        className="CreateListingForm-form container"
        encType="multipart/form-data"
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
              <label htmlFor="location" className="form-label">
                Location:{" "}
              </label>
              <input
                id="location"
                name="location"
                className="form-control"
                onChange={handleChange}
                value={formData.location || ""}
                aria-label="Listing location"
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
              <label htmlFor="description" className="form-label">
                Listing description:{" "}
              </label>
              <input
                id="description"
                name="description"
                type="textarea"
                rows="5"
                className="form-control"
                onChange={handleChange}
                value={formData.description || ""}
                aria-label="Listing description"
                required
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="image" className="form-label">
                Upload a photo:
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="form-control"
                onChange={handleChange}
                // value={formData.image}
              />
            </div>

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
