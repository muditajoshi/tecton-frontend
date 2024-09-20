import React from "react";
import { Link } from "react-router-dom";

const pageNotFound = () => {
  return (
    <div className="productEditPage">
      <div class="container">
        <div className="error-page" style={{ textAlign: "center" }}>
          <h1 style={{ color: "orange", fontSize: "70px" }}>
            <b>404 </b>{" "}
          </h1>

          <h4>
            <b> Page not found</b>
          </h4>
          <br />
          <Link
            to="/shop"
            class="select"
            style={{
              color: "white",
              backgroundColor: "orange",
              padding: "7px 16px 7px 16px",
              fontSize: "15px",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            S H O P &nbsp; N O W
          </Link>
        </div>
      </div>
    </div>
  );
};

export default pageNotFound;
