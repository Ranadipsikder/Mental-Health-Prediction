import React, { useState } from 'react';
import axios from 'axios';
import './MentalHealthForm.css'; // Ensure this import is correct

const initialFormData = {
  Age: '',
  Gender: '',
  self_employed: '',
  family_history: '',
  work_interfere: '',
  remote_work: '',
  tech_company: '',
  benefits: '',
  care_options: '',
  wellness_program: '',
  seek_help: '',
  anonymity: '',
  leave: '',
  mental_health_consequence: '',
  phys_health_consequence: '',
  coworkers: '',
  supervisor: '',
  mental_health_interview: '',
  phys_health_interview: '',
  mental_vs_physical: '',
  obs_consequence: ''
};

function MentalHealthForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Convert all fields to numbers
      const numericData = {};
      for (const key in formData) {
        if (key === 'Gender') {
          numericData[key] = formData[key] === 'Female' ? 0 : formData[key] === 'Male' ? 1 : null;
        } else {
          numericData[key] = formData[key] === 'Yes' ? 1 : formData[key] === 'No' ? 0 : Number(formData[key]);
        }
      }

      const response = await axios.post('http://localhost:5000/predict', numericData);
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error("Error making prediction:", err);
      setError('Error making prediction. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Mental Health Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {Object.keys(initialFormData).map((field) => (
            <div key={field} className="form-group">
              <label>{field}: </label>
              {field === 'Age' ? (
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              ) : field === 'Gender' ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              )}
            </div>
          ))}
        </div>
        <button type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <div className="result-box">
          <h3>Prediction Result:</h3>
          <p>{prediction === 1 ? 'Needs Mental Health Treatment' : 'Does Not Need Treatment'}</p>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default MentalHealthForm;
