import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import MySubscription from "./pages/Mysubscription";
import AdminPlans from "./pages/Adminplans"; // Make sure this file exists!

function App() {
  // Check the user's role from local storage
  const userRole = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/subscription" element={<MySubscription />} />
        
        
      <Route 
  path="/admin/plans" 
  element={<AdminPlans key={window.location.pathname} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;