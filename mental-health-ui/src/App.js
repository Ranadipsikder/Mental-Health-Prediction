import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import FormPage from "./Patientpage";
import MentalHealthForm from "./MentalHealthForm"; // Importing MentalHealthForm

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patient" element={<FormPage />} />
        <Route path="/mental" element={<MentalHealthForm />} /> {/* Add the route for MentalHealthForm */}
      </Routes>
    </Router>
  );
}

export default App;
