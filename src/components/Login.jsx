import React, { useState, useEffect } from "react";
import { trackClick } from "../utils/trackClick";
import AnimatedBackground from "./AnimatedBackground";

export default function Login({ onLogin }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isEnterLoading, setIsEnterLoading] = useState(false);
  const [isExitLoading, setIsExitLoading] = useState(false);
  const [installButtonReady, setInstallButtonReady] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone || 
                       document.referrer.includes('android-app://');

    if (isInstalled) {
      setShowInstallButton(false);
      return;
    }

    let deferredPrompt = null;

    const beforeInstallHandler = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      // Update state to show install button
      setShowInstallButton(true);
      setDeferredPrompt(e);
    };

    const installedHandler = () => {
      // Hide the install button
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    // Check if the browser supports the beforeinstallprompt event
    if ('onbeforeinstallprompt' in window) {
      window.addEventListener('beforeinstallprompt', beforeInstallHandler);
      window.addEventListener('appinstalled', installedHandler);
    }

    // Clean up event listeners
    return () => {
      if ('onbeforeinstallprompt' in window) {
        window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
        window.removeEventListener('appinstalled', installedHandler);
      }
    };
  }, []);

  // Handle PWA installation
  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log("Install prompt not available");
      return;
    }

    try {
      // Track install attempt
      const trackPromise = trackClick("btblite_install_click", "beyondthebrush_lite").catch(console.error);
      
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // Track the outcome
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        trackClick("btblite_install_success", "beyondthebrush_lite").catch(console.error);
      } else {
        console.log('User dismissed the install prompt');
        trackClick("btblite_install_dismissed", "beyondthebrush_lite").catch(console.error);
      }
      
      // Clear the deferredPrompt so it can be garbage collected
      setDeferredPrompt(null);
      
      // Hide the install button regardless of the outcome
      setShowInstallButton(false);
      
      // Wait for tracking to complete (but don't block the UI)
      await trackPromise;
      
    } catch (error) {
      console.error('Error during installation:', error);
      setShowInstallButton(false);
      setDeferredPrompt(null);
    }
  };

  // ✅ Handle login - Optimized for speed
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEnterLoading(true);
    
    // Start tracking immediately without waiting
    trackClick("btblite_enter", "beyondthebrush_lite").catch(console.error);
    
    // Process login immediately without artificial delays
    setTimeout(() => {
      onLogin("student", "Student");
    }, 100);
  };

  // ✅ Handle exit - Optimized for speed
  const handleExit = async () => {
    setIsExitLoading(true);
    
    // Start tracking immediately without waiting
    trackClick("btblite_exit", "beyondthebrush_lite").catch(console.error);
    
    // Navigate immediately without artificial delays
    setTimeout(() => {
      window.location.href = "https://btbsite.onrender.com";
    }, 100);
  };

  // Circle Loading Component
  const CircleLoader = ({ size = 24, color = "white" }) => (
    <div className="flex items-center justify-center">
      <div 
        className="animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
        style={{ 
          width: size, 
          height: size,
          color: color
        }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <AnimatedBackground />
      
      {/* ✅ Header */}
      <header className="w-full flex justify-between items-center p-4 fixed top-0 left-0 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-700 z-10">
        <h1 className="text-white font-semibold tracking-wide text-lg">
        </h1>

        {showInstallButton && (
          <button
            onClick={handleInstall}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors shadow-md animate-fade-in"
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
            disabled={isEnterLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isEnterLoading ? (
              <>
                <CircleLoader size={20} color="white" />
                Entering...
              </>
            ) : (
              "Enter"
            )}
          </button>

          <button
            type="button"
            onClick={handleExit}
            disabled={isExitLoading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isExitLoading ? (
              <>
                <CircleLoader size={20} color="white" />
                Exiting...
              </>
            ) : (
              "Exit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}