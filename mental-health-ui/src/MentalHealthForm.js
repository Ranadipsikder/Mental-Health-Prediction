import React, { useState } from "react";
import axios from "axios";
import "./MentalHealthForm.css";

export default function MentalHealthForm() {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    self_employed: "",
    family_history: "",
    work_interfere: "",
    remote_work: "",
    tech_company: "",
    benefits: "",
    care_options: "",
    wellness_program: "",
    seek_help: "",
    anonymity: "",
    leave: "",
    mental_health_consequence: "",
    phys_health_consequence: "",
    coworkers: "",
    supervisor: "",
    mental_health_interview: "",
    phys_health_interview: "",
    mental_vs_physical: "",
    obs_consequence: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setResult(response.data.treatment);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  const yesNoOptions = ["Yes", "No"];
  const genderOptions = ["Male", "Female", "Other"];
  const leaveOptions = ["Very easy", "Somewhat easy", "Don't know", "Somewhat difficult", "Very difficult"];

  const renderInput = (key) => {
    switch (key) {
      case "Age":
        return (
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        );
      case "Gender":
        return (
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {genderOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case "leave":
        return (
          <select
            name="leave"
            value={formData.leave}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Flexibility</option>
            {leaveOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      default:
        return yesNoOptions.includes(formData[key]) || key.includes("consequence") || key.includes("interview") || key.includes("work") || key.includes("help") ? (
          <select
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            {yesNoOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        );
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Mental Health Survey</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/_/g, ' ')}</label>
            {renderInput(key)}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div className="result-box">
          <strong>Prediction Result:</strong>
          <p>
            {result === "Yes"
              ? "✅ You may benefit from mental health treatment."
              : "👍 You may not need treatment at this time."}
          </p>
        </div>
      )}
    </div>
  );
}


