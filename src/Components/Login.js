import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useDataContext } from "../Context/DataContext";
import "./login.css";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const { setIsLoggedIn } = useDataContext();
  const [userdata, setuserdata] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const formValue = (event) => {
    setuserdata({ ...userdata, [event.target.name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (userdata.email && userdata.password) {
      const users = JSON.parse(localStorage.getItem("Users"));
      var flag = false;
      for (var i = 0; i < users?.length; i++) {
        if (
          users[i].email == userdata.email &&
          users[i].password == userdata.password
        ) {
          flag = true;
          login(users[i]);
          toast("login successfull");
          setuserdata({ email: "", password: "" });
          setIsLoggedIn(true);
          navigate("/chart");
          break;
        }
      }

      if (flag == false) {
        toast.error("Your email or password is incorrect");
      }
    } else {
      toast.info("Please fill all details");
    }
  };

  const guestLogin = () => {
    setuserdata({ email: "testuser", password: "123" });
    setIsLoggedIn(true);
    toast.success("guest login successfully");
    navigate("/chart");

  };
  return (
    <div className="register-body">
      <div className="loginpage">
        <div className="loginId">
          <p className="loginMargin">
            <span className="loginSize">lOGIN</span>
          </p>
          <form onSubmit={formSubmit}>
            <input
              type="email"
              className="inputCss"
              name="email"
              onChange={formValue}
              placeholder="Enter Email"
            />
            <br />
            <input
              type="password"
              className="inputCss"
              name="password"
              onChange={formValue}
              placeholder="Enter Password"
            />
            <input
              type="button"
              className="buttonCss guestLogin"
              value="Guest Login"
              onClick={guestLogin}
            />
            <input
              type="submit"
              className="buttonCss buttonMargin"
              value="CONTINUE"
            />
          </form>
          <p className="terms loginMargin">
            If you Don't have Account then{" "}
            <span className="spanColor" onClick={() => navigate("/signup")}>
              <b>Sign up from here</b>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
