// components/AdminPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="w-full bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={handleBackClick}
            className="bg-white text-black py-2 px-6 rounded-lg font-semibold text-sm hover:bg-gray-200 transition duration-200"
          >
            Back
          </button>
          <h1 className="text-white text-xl font-semibold">Admin Panel</h1>
          <div className="w-20"></div> {/* For balance */}
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-3xl mb-4">Admin Page</h2>
          <p>Welcome to the admin panel</p>
        </div>
      </div>
    </div>
  );
}