import React from "react";
import "./App.css";
import DashBoard from "./components/App/Dashboard";
import Login from "./components/Login/Login";
import useToken from "./components/Login/useToken";
import UserPage from "./components/UserPage/UserPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/user"
          element={<UserPage token={token} setToken={setToken} />}
        ></Route>
        <Route
          path="/"
          element={<DashBoard token={token} setToken={setToken} />}
        ></Route>
      </Routes>
    </Router>
  );
}
export default App;
