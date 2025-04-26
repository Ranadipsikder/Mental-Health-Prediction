import React from "react";

const HomePage = () => {
  const handleStartClick = () => {
    alert("Your journey has begun. Welcome to MannMitra!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-xl text-center">
        <h1 className="text-2xl text-gray-800 font-bold mb-6">
          MannMitra - empowering mental health prediction using AI ML
        </h1>
        <p className="text-base text-gray-700 mb-8">
          Namaste and welcome!<br />
          We’re so happy to have you here. This is your safe space to relax, reflect,
          and recharge. Take a deep breath — your journey to peace and wellness
          begins now. We’re with you, every step of the way.
        </p>
        <button
          onClick={handleStartClick}
          className="bg-gray-500 text-white px-6 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default HomePage;
