// src/utils/trackClick.js
export const trackClick = async (button, page) => {
    try {
      await fetch("https://beyondthebrush.onrender.com/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ button, page }),
      });
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  };
  
 