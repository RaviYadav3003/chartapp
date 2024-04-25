import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home";
import ChartComponent from "./Components/ChartComponent";
import { RequiresAuth } from "./Components/Auth/RequiresAuth";
import { Navbar } from "./Components/Navbar";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chart"
          element={
            <RequiresAuth>
              <ChartComponent />
            </RequiresAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
