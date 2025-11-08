import React, { useEffect } from "react";
import AnimatedBackground from "./AnimatedBackground";

export default function LoadingScreen({ progress, setProgress, onComplete }) {
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 100;
        }
        const increment = prev < 50 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 10);
    
    return () => clearInterval(interval);
  }, [setProgress, onComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      <AnimatedBackground />
      <div className="text-center p-4 w-full max-w-md">
        <div className="w-48 h-48 mx-auto mb-8">
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
        
        <div className="text-2xl text-white mb-6">Loading Please Wait</div>
        
        {/* Simple rectangular loading bar */}
        <div className="w-64 h-3 bg-gray-700 rounded-sm mx-auto overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-150 rounded-sm"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}