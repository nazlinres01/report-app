import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Rapor from "./pages/Rapor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rapor" element={<Rapor />} />
      </Routes>
    </Router>
  );
}

export default App;
