import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDataContext } from "../../Context/DataContext";

export const RequiresAuth = ({ children }) => {
  const { isLoggedIn } = useDataContext();
  const location = useLocation();

  // Log the current location pathname and isLoggedIn status
  console.log("Current location:", location.pathname);
  console.log("Is logged in:", isLoggedIn);

  // Check if the current location is the login page
  const isLoginPage = location.pathname === "/login";

  // If the user is not logged in and the current page is the login page,
  // redirect to the home page instead of the login page
  if (!isLoggedIn && isLoginPage) {
    console.log("Redirecting to home page");
    return <Navigate to="/" />;
  }

  // If the user is logged in or the current page is not the login page,
  // render the children
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
