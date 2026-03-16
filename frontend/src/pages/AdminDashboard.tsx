import { useNavigate } from "react-router-dom";
import Navbar from "../components/Sidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-slate-900 to-blue-950 overflow-x-hidden">
      <Navbar />
      <main className="flex-1 p-10 pt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Admin Dashboard</h2>
          <div className="bg-[#1e293b] p-10 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Welcome, Admin</h3>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              This is your private workspace. From here, you can monitor system activity and manage subscription offerings.
            </p>
            
            <button 
              onClick={() => navigate("/admin/plans")}
              className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
            >
              Manage Plans
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}