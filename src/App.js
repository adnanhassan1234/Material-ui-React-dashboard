import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cards from "./components/Card/Card";
import About from "./components/About/About";
import Service from "./components/Service/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import Employee from "./components/Employee/Employee";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import LeaveAdmin from "./components/Leave Admin/LeaveAdmin";
import Dashboard from "./components/Dashboard/Dashboard";
import Dashboard2 from "./components/Dashboard1/Dashboard";

function App() {
  const mobileScreen = useSelector((state) => state.dashboard.mobileView);

  return (
    <Router>
      <div>
        <Sidebar />
        <div
          style={
            mobileScreen
              ? {
                  marginLeft: "244px",
                  marginTop: "108px",
                  marginRight: "3px",
                }
              : { marginTop: "108px" }
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/leaves-admin" element={<LeaveAdmin />} />
            <Route path="/dashboard2" element={<Dashboard2 />} />
            {/* add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
