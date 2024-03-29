import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>404!</h1>
      <h3>Unfortunately this page cannot be found</h3>
      <h4>
        <Link to="/">Return to safety</Link>
      </h4>
    </div>
  );
};

export default NotFound;
