import React from "react";
import "./App.css";
import DashBoard from "./components/App/Dashboard";
import Login from "./components/Login/Login";
import useToken from "./components/Login/useToken";

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <DashBoard token={token} setToken={setToken} />;
}
export default App;
