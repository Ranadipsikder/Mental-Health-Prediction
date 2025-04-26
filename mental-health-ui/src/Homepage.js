import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    alert("Your journey has begun. Welcome to MannMitra!");
    navigate("/patient");
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">MannMitra</h1>
        <p className="home-subtitle">
          <strong>Empowering Mental Health Prediction using AI-ML</strong><br />
          Namaste and welcome! This is your safe space to relax, reflect,
          and recharge. Take a deep breath — your journey to peace and wellness
          begins now. We're with you, every step of the way.
        </p>
        <button className="start-button" onClick={handleStartClick}>
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default HomePage;
