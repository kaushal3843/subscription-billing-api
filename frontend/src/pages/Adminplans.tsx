import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Sidebar";
import API from "../api/api";

export default function AdminPlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- Revenue Report State ---
  const [report, setReport] = useState<{ total_revenue: number; total_subscriptions: number } | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      const res = await API.get("/plans/");
      if (Array.isArray(res.data)) {
        setPlans(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch plans", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Function to fetch Revenue Report ---
  const fetchRevenueReport = async () => {
    setLoadingReport(true);
    try {
      const res = await API.get("/reports/revenue-summary");
      setReport(res.data);
    } catch (error) {
      console.error("Failed to fetch report", error);
      alert("Failed to generate report.");
    } finally {
      setLoadingReport(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const planData = {
      name,
      price: Number(price),
      duration_days: Number(durationDays),
    };

    try {
      if (editingId) {
        await API.put(`/plans/${editingId}`, planData);
        alert("Plan updated!");
      } else {
        await API.post("/plans/", planData);
        alert("Plan created!");
      }
      resetForm();
      fetchPlans(); 
    } catch (error) {
      console.error(error);
      alert("Error saving plan.");
    }
  };

  const handleDelete = async (planId: number) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
  
    try {
      await API.delete(`/plans/${planId}`);
      alert("Plan deleted successfully");
      fetchPlans();
    } catch (error: any) {
      console.error(error);
  
      // Show backend error message to user
      if (error.response && error.response.data && error.response.data.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Cannot delete this plan. Users may already be subscribed.");
      }
    }
  };
  const handleEditClick = (plan: any) => {
    setEditingId(plan.id);
    setName(plan.name);
    setPrice(plan.price.toString());
    setDurationDays(plan.duration_days.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setDurationDays("");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading Admin Panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-slate-900 to-blue-950 overflow-x-hidden">
      <Navbar />
      <div className="max-w-5xl mx-auto p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-4xl font-bold">Manage Plans</h1>
          <button 
            onClick={fetchRevenueReport}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2"
          >
            {loadingReport ? "Generating..." : "📊 Generate Report"}
          </button>
        </div>

       {/* --- Revenue Report Section --- */}
{report && Array.isArray(report) && (
  <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-10 border-t-4 border-emerald-500 animate-in fade-in zoom-in duration-300">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl text-white font-bold">Revenue by Plan</h2>
      <div className="text-right">
        <p className="text-emerald-400 text-sm font-semibold uppercase">Grand Total</p>
        <p className="text-3xl text-white font-black">
          ₹{report.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}
        </p>
      </div>
    </div>

    {/* Scrollable Table for Plan-wise breakdown */}
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table className="w-full text-left text-gray-300">
        <thead className="bg-slate-900 text-gray-400 uppercase text-xs font-bold">
          <tr>
            <th className="px-6 py-3">Plan Name</th>
            <th className="px-6 py-3 text-center">Subscribers</th>
            <th className="px-6 py-3 text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {report.map((item, index) => (
            <tr key={index} className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 font-medium text-white">{item.plan_name}</td>
              <td className="px-6 py-4 text-center">{item.subscribers}</td>
              <td className="px-6 py-4 text-right text-emerald-400 font-bold">
                ₹{item.revenue.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
        {/* Form Section */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10 border border-slate-700">
          <h2 className="text-2xl text-white font-semibold mb-4">
            {editingId ? "Edit Mode" : "Create New Plan"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-gray-400 block mb-1">Plan Name</label>
              <input 
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="w-32">
              <label className="text-gray-400 block mb-1">Price</label>
              <input 
                type="number" required value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="w-32">
              <label className="text-gray-400 block mb-1">Days</label>
              <input 
                type="number" required value={durationDays} onChange={(e) => setDurationDays(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded h-[42px] font-medium transition">
                {editingId ? "Save Changes" : "Add Plan"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded h-[42px] font-medium transition">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md hover:border-slate-500 transition-all">
              <h3 className="text-2xl text-white font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 font-medium">₹{plan.price} • {plan.duration_days} Days</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => handleEditClick(plan)} className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-2 rounded font-medium transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(plan.id)} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded font-medium transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}