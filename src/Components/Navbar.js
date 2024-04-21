import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { dispatch, isLoggedIn, setIsLoggedIn } = useDataContext();

  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    toast.success("logout successfully");
  };
  return (
    <React.Fragment>
      <div className="navbar-container">
        <nav className="nav-name">
          <NavLink to="/">Chart-App</NavLink>
        </nav>

        <div className="header-profile">
          <nav>
            <NavLink to="/chart">
              <i class="material-symbols-outlined">bar_chart</i>
            </NavLink>
            {isLoggedIn ? (
              <NavLink>
                {" "}
                <span
                  class="material-symbols-outlined"
                  onClick={() => logout()}
                >
                  logout
                </span>{" "}
              </NavLink>
            ) : (
              <NavLink to="/login">
                {" "}
                <span class="material-symbols-outlined">login</span>
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};
