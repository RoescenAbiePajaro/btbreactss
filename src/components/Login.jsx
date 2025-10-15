import React, { useState, useEffect } from "react";
import { trackClick } from "../utils/trackClick";

export default function Login({ onLogin }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Detect when the app can be installed
    const beforeInstallHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Hide install button after installation
    const installedHandler = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  // ✅ Handle PWA installation
  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Track that the install button was clicked
    await trackClick("btblite_install_click", "page_menu");

    // Show the browser install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ PWA installed");
      // Track successful installation
      await trackClick("btblite_install_success", "page_menu");
    } else {
      console.log("❌ PWA installation dismissed");
      await trackClick("btblite_install_dismissed", "page_menu");
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // ✅ Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    await trackClick("btblite_enter", "page_menu");
    onLogin("student", "Student");
  };

  // ✅ Handle exit (updated to navigate to a specific URL)
  const handleExit = async () => {
    await trackClick("btblite_exit", "page_menu");
    window.location.href = "https://btbsite.onrender.com"; // Replace with your desired URL
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* ✅ Header */}
      <header className="w-full flex justify-between items-center p-4 fixed top-0 left-0 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-700 z-10">
        <h1 className="text-white font-semibold tracking-wide text-lg">
        </h1>

        {showInstallButton && (
          <button
            onClick={handleInstall}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors shadow-md"
          >
            Install Lite
          </button>
        )}
      </header>

      {/* ✅ Main Content */}
      <div className="bg-black rounded-2xl p-8 w-full max-w-md mt-16">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4">
            <img
              src="/icon/logo.png"
              alt="Beyond The Brush"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
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
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-4"
          >
            Enter
          </button>

          <button
            type="button"
            onClick={handleExit}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Exit
          </button>
        </form>
      </div>
    </div>
  );
}