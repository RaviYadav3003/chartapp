import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const initialState = { user: null };
const reducer = (state, action) => {
  switch (action?.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    case "default":
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = (userdata) => {
    localStorage.setItem("CurrentUser", JSON.stringify(userdata));
    dispatch({
      type: "login",
      payload: userdata,
    });
  };

  const logout = () => {
    localStorage.removeItem("CurrentUser");
    dispatch({
      type: "logout",
    });
    navigate("/");
  };

  useEffect(() => {
    const isUserPresent = JSON.parse(localStorage.getItem("CurrentUser"));
    if (isUserPresent) {
      dispatch({
        type: "login",
        payload: isUserPresent,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
