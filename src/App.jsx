import React from "react";
import CanvasApp from "./components/CanvasApp";

export default function App() {
  // Default user data - adjust as needed
  const userData = { userType: "default", username: "user" };
  
  return <CanvasApp userData={userData} />;
}