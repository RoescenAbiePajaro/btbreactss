// Login.jsx

import React, { useState } from "react";
import { trackClick } from "../utils/trackClick";

export default function Login({ onLogin }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Track the login click
    await trackClick("btblite_enter", "page_menu");
    // Automatically log in as a student with a default name
    onLogin("student", "Student");
  };

  const handleExit = async () => {
    // Track the exit click
    await trackClick("btblite_exit", "page_menu");
    window.close();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-black rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4">
            <img 
              src="/icon/logo.png" 
              alt="Beyond The Brush" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          </div>
          <h2 className="text-4xl text-white text-center">
            Beyond The Brush Lite
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors mb-4"
          >
            Enter
          </button>

          <button
            type="button"
            onClick={handleExit}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
          >
            Exit
          </button>
        </form>
      </div>
    </div>
  );
}