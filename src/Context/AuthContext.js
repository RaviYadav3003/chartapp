import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action?.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userdata) => {
    dispatch({
      type: "login",
      payload: userdata,
    });
  };

  const logout = () => {
    dispatch({
      type: "logout",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
