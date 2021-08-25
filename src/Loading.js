import React from "react";
import "./Loading.css";

/** Renders a Loading message during API requests. */

export default function Loading() {
  return (
    <div className="Loading">
      <div className="Loading-msg">Loading...</div>
    </div>
  )
}