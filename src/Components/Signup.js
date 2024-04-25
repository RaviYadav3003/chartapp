import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.password) {
      if (!isEmailValid(userData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      const userArray = JSON.parse(localStorage.getItem("Users")) || [];
      const existingUser = userArray.find(user => user.email === userData.email);
      if (existingUser) {
        toast.error("An account with this email already exists");
        return;
      }
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
      toast.info("Please fill in all data");
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
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address"
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

