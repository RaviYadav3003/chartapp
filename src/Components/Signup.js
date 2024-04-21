import React, { useContext, useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const formValue = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.password) {
      const userArray = JSON.parse(localStorage.getItem("Users")) || [];
      const userObj = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };
      userArray.push(userObj);
      localStorage.setItem("Users", JSON.stringify(userArray));
      toast.success("Registration Successfull");
      navigate("/login");
    } else {
      toast.info("please fill all data");
    }
  };

  return (
    <div className="register-body">
      <div className="loginpage">
        <div className="loginId">
          <p className="loginMargin">
            <span className="loginSize">Signup</span>
          </p>
          <form onSubmit={formSubmit}>
            <input
              type="text"
              style={{ padding: "6px" }}
              className="input-Css"
              name="name"
              onChange={formValue}
              placeholder="Enter Name"
            />
            <input
              type="email"
              style={{ padding: "6px" }}
              className="input-Css"
              name="email"
              onChange={formValue}
              placeholder="Enter Email"
            />
            <input
              type="text"
              style={{ padding: "6px" }}
              className="input-Css"
              name="password"
              onChange={formValue}
              placeholder="Enter password"
            />

            <input
              type="submit"
              className="buttonCss buttonMargin"
              value="CONTINUE"
            />
          </form>
          <p className="terms loginMargin">
            Already have account then{" "}
            <span className="spanColor" onClick={() => navigate("/login")}>
              <b>Login in from here</b>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
