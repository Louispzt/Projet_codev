import React, { useState } from "react";
import "./App.css";
import DashBoard from "./components/Dashboard";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <DashBoard />;
}
export default App;
