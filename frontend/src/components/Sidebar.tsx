import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  // 1. Get the user's role from local storage
  const userRole = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // 2. Make sure to clear the role on logout!
    navigate("/");
  };

  return (
    <div className="w-full bg-blue-950 text-white flex items-center justify-between px-10 py-4">
      
      <h1 className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}>
        Subscription App
      </h1>

      <div className="flex gap-8 items-center">
        
        <button onClick={() => navigate("/dashboard")} className="hover:text-blue-300 transition">
          Dashboard
        </button>

        <button onClick={() => navigate("/plans")} className="hover:text-blue-300 transition">
          Plans
        </button>

        <button onClick={() => navigate("/subscription")} className="hover:text-blue-300 transition">
          My Subscription
        </button>

        {/* 3. Conditionally show the Admin button */}
        {userRole === "admin" && (
          <button 
            onClick={() => navigate("/admin/plans")} 
            className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
          >
            Manage Plans
          </button>
        )}

        <button onClick={logout} className="text-red-400 hover:text-red-300 transition ml-4">
          Logout
        </button>

      </div>
    </div>
  );
}