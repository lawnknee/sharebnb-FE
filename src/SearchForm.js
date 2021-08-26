import React, { useState } from "react";

/** SearchForm Component.
 *
 * Props:
 *    - search (parent callback) that allows for live search
 *
 *  State:
 *    - searchTerm
 *
 * ListingsContainer -> SearchForm
 */
function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm.trim());
    setSearchTerm("");
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }
  return (
    <div className="SearchForm mt-5">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            value={searchTerm}
            className="form-control"
            placeholder="Search listings by title"
            aria-label="Search term"
            onChange={handleChange}
            aria-describedby="button-addon2"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
