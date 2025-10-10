// AdminLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log('Login attempted with:', { username, password });
  };

  const handleRegister = () => {
    navigate('/admin-registration'); // Navigates to AdminRegistration.jsx
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header Navigation */}
      <header className="w-full bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left side - Back button */}
          <button 
            onClick={handleBack}
            className="bg-white text-black py-2 px-6 rounded-lg font-semibold text-sm hover:bg-gray-200 transition duration-200"
          >
            Back
          </button>
          
          {/* Center - empty for balance */}
          <div className="flex-1 flex justify-center"></div>
          
          {/* Right side - empty for balance */}
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-black border border-gray-800 rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm bg-black text-white focus:outline-none focus:ring-white focus:border-white"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm bg-black text-white focus:outline-none focus:ring-white focus:border-white"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg font-semibold text-lg text-black bg-white hover:bg-gray-200 transition duration-200"
              >
                Login
              </button>
            </div>
            <div>
              <button
                onClick={handleRegister}
                className="w-full flex justify-center py-3 px-6 border-2 border-white rounded-lg font-semibold text-lg text-white hover:bg-white hover:text-black transition duration-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;