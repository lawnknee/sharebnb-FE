import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";

/** Renders a Signup Form to create a new user.
 *
 *  After submitting form:
 *      - registers and logs user in
 *      - redirect to /listings
 *
 *  State:
 *      - formData
 *      - errors
 *
 *  Context:
 *      - UserContext
 *
 *  App -> Routes -> SignupForm
 */
function SignupForm({ register }) {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await register(formData);
      history.push("/listings");
    } catch (errs) {
      setFormErrors(errs);
    }
  }

  return (
    <div className="SignupForm pt-5">
      <form onSubmit={handleSubmit} className="SignupForm-form container">
        {formErrors.length > 0 &&
          formErrors.map((error) => (
            <div key={error} className="alert alert-danger">
              <strong>{error}</strong>
            </div>
          ))}
        <div className="SignupForm-card card">
          <h1>Sign up</h1>
          <div className="SignupForm-card card-body">
            <div className="form-group mb-4">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                name="username"
                className="form-control"
                onChange={handleChange}
                value={formData.username || ""}
                aria-label="Username"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                onChange={handleChange}
                value={formData.password || ""}
                aria-label="Password"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="first-name">First Name: </label>
              <input
                id="first-name"
                name="firstName"
                className="form-control"
                onChange={handleChange}
                value={formData.firstName || ""}
                aria-label="first-name"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="last-name">Last Name: </label>
              <input
                id="last-name"
                name="lastName"
                className="form-control"
                onChange={handleChange}
                value={formData.lastName || ""}
                aria-label="last-name"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={formData.email || ""}
                aria-label="Email"
              />
            </div>
            <button className="btn btn-primary mt-4" type="submit">
              Sign Up!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
