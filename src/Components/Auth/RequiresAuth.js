import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDataContext } from "../../Context/DataContext";

export const RequiresAuth = ({ children }) => {
  const { isLoggedIn, } = useDataContext();
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
