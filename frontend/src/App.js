import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";
import { GlobalStyles } from "@mui/material";
import Profile from "./Dashboard/AppBar/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />

          <Route exact path="/register" element={<RegisterPage />} />

          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <AlertNotification />
      <GlobalStyles
        styles={{
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      />
    </>
  );
}

export default App;
