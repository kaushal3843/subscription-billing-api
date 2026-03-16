import { useEffect, useState } from "react";
import Navbar from "../components/Sidebar";
import API from "../api/api";

export default function Dashboard() {
  const [totalPlans, setTotalPlans] = useState<number>(0);
  const [activeSubscription, setActiveSubscription] = useState<number>(0);
  const [nextExpiry, setNextExpiry] = useState<string>("N/A");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const plansRes = await API.get("/plans");
      setTotalPlans(plansRes.data.length);
      const subRes = await API.get("/subscriptions/me");
      
      if (subRes.data && !subRes.data.message) {
        setActiveSubscription(1);
        
        if (subRes.data.expiry_date) {
          const formattedDate = new Date(subRes.data.expiry_date).toISOString().split('T')[0];
          setNextExpiry(formattedDate);
        } else {
          setNextExpiry("Unknown");
        }
      } else {
        setActiveSubscription(0);
        setNextExpiry("N/A");
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-slate-900 to-blue-950 overflow-x-hidden">
      
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-white text-3xl font-semibold mb-10">
          Dashboard
        </h1>

        {loading ? (
          <p className="text-gray-400 text-xl">Loading dashboard...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <p className="text-gray-400">Active Subscription</p>
              <h2 className="text-white text-3xl mt-2 font-bold">{activeSubscription}</h2>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <p className="text-gray-400">Total Plans</p>
              <h2 className="text-white text-3xl mt-2 font-bold">{totalPlans}</h2>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <p className="text-gray-400">Next Expiry</p>
              <h2 className="text-white text-3xl mt-2 font-bold">{nextExpiry}</h2>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}