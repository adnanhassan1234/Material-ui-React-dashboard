import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cards from "./components/Card/Card";
import About from "./components/About/About";
import Service from "./components/Service/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import Employee from "./components/Employee/Employee";
import { Box } from "@mui/material";
// import other components that you want to render

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <div
          style={{
            marginLeft: "244px",
            marginTop: "108px",
            marginRight: "3px",
          }}
        >
          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/employee" element={<Employee />} />
            {/* add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
