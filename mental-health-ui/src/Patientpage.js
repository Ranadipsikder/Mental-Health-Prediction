import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Change from useHistory to useNavigate
import "./Patientpage.css";

const FormPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    dob: "",
    relationType: "",
    parentName: "",
    phone: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowDropdown = () => {
    setShowDropdown(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    // Removed the success alert
    navigate("/mental"); // Navigate to the mental health form page after submission
  };

  return (
    <div className="patient-container">
      <form onSubmit={handleSubmit} className="patient-form">
        <h2 className="form-title">Personal Details</h2>

        <div className="input-group">
          <label className="input-label">Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <h2 className="form-title">Parent/Guardian Info</h2>

        {!showDropdown ? (
          <div className="input-group">
            <button
              type="button"
              onClick={handleShowDropdown}
              className="submit-button"
            >
              Select Parent/Guardian
            </button>
          </div>
        ) : (
          <>
            <div className="input-group">
              <label className="input-label">Relation Type</label>
              <select
                name="relationType"
                value={formData.relationType}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">-- Select --</option>
                <option value="Father">Father</option>
                <option value="Husband">Husband</option>
                <option value="Family Member">Family Member</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Name</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label className="input-label">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
