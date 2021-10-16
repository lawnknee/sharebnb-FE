import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

/** Renders a Login Form to login a user
 *
 *  After submitting form:
 *      - login user
 *      - redirect to /listings
 *
 *  State:
 *      - formData
 *      - errors
 *
 *  Context:
 *      - UserContext
 *
 *  History:
 *      - Redirects to /listings after login
 *
 *  App -> Routes -> LoginForm
 */
function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState([]);

  // console.debug(`LoginForm`, formData, formErrors);

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
      await login(formData);
      history.push("/listings");
    } catch (errs) {
      setFormErrors([...errs]);
    }
  }

  return (
    <div className="LoginForm pt-5">
      <form onSubmit={handleSubmit} className="LoginForm-form container">
        {formErrors.length > 0 &&
          formErrors.map((error) => (
            <div key={error} className="alert alert-danger">
              <strong>{error}</strong>
            </div>
          ))}
        <div className="LoginForm-card card">
          <h1>Log In</h1>
          <div className="LoginForm-card card-body">
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
            <div className="form-group">
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

            <button className="btn btn-primary mt-4" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
