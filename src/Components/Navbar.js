import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useDataContext } from "../Context/DataContext";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useDataContext();



  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("CurrentUser");
    toast.success("logout successfully");
  };
  return (
    <>
      <div className="navbar-container">
        <nav className="nav-name">
          <NavLink to="/">Chart-App</NavLink>
        </nav>

        <div className="header-profile">
          <nav>
            <NavLink to="/chart">
              <span class="material-symbols-outlined">
                monitoring
              </span>
            </NavLink>
            {isLoggedIn ? (
              <NavLink>
                {
                  <span
                    class="material-symbols-outlined"
                    onClick={() => logout()}

                  >
                    logout
                  </span>}
              </NavLink>
            ) : (
              <NavLink to="/login">
                <span class="material-symbols-outlined" >login</span>
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};
