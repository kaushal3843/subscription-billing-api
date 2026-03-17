import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import { getUser, isLoggedIn } from "./utils/token"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import MySubscription from "./pages/Mysubscription";
import AdminPlans from "./pages/Adminplans";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const user = getUser()
  return (
    <BrowserRouter>

    {isLoggedIn() && user?.role === "admin" && <AdminDashboard />}
    {isLoggedIn() && user?.role === "user" && <Dashboard />}
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/subscription" element={<MySubscription />} />         
          <Route path="/admin/dashboard" element={<AdminDashboard />} />        
          <Route path="/admin/plans" element={<AdminPlans />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />


        </Routes>
              
    </BrowserRouter>
  );
} 
export default App;