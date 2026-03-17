import { useNavigate } from "react-router-dom";
import { getUser, removeToken } from "../utils/token"; 

export default function Navbar() {
  const navigate = useNavigate();
  
  
  const user = getUser(); 
  const userRole = user?.role;

  const logout = () => {
    removeToken(); 
    navigate("/");
  };

  return (
    <div className="w-full bg-[#0f172a] text-white flex items-center justify-between px-10 py-4 shadow-md">
      <h1 
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate(userRole === "admin" ? "/admin/dashboard" : "/dashboard")}
      >
        Subscription App
      </h1>

      <div className="flex gap-6 items-center">
        {userRole === "user" && (
          <>
            <button onClick={() => navigate("/dashboard")} className="hover:text-blue-400">Dashboard</button>
            <button onClick={() => navigate("/plans")} className="hover:text-blue-400">Plans</button>
            <button onClick={() => navigate("/subscription")} className="hover:text-blue-400">My Subscription</button>
          </>
        )}

        {userRole === "admin" && (
          <>
            <button 
              onClick={() => navigate("/admin/plans")} 
              className="bg-yellow-600/20 text-yellow-500 px-4 py-1.5 rounded-md border border-yellow-600/50 hover:bg-yellow-600/30 transition"
            >
              Manage Plans
            </button>
          </>
        )}

        <button 
          onClick={logout} 
          className="bg-red-900/20 text-red-500 px-4 py-1.5 rounded-md border border-red-900/50 hover:bg-red-900/30 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}