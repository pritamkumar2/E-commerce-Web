import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { Axios } from "axios";
const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object from react-router-dom

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const jwt = queryParams.get("jwt");
    const email = queryParams.get("email");

    if (jwt) {
      localStorage.setItem("jwtToken", jwt);
      console.log("JWT token saved:", jwt);
      // Redirect to home page after saving JWT token
      navigate("/");
    } else {
      console.error("JWT token not found in query params.");
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Success!</h1>
      {/* You can add any additional content here */}
    </div>
  );
};

export default SuccessPage;
