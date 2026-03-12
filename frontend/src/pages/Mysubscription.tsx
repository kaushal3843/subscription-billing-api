import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Sidebar";


export default function MySubscription() {
    const [subscription, setSubscription] = useState<any>(null);
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        // Fetch both user subscription and the master plans list simultaneously
        const [subRes, plansRes] = await Promise.all([
          API.get("/subscriptions/me"),
          API.get("/plans/")
        ]);
  
        setPlans(plansRes.data);
        
        // Extract the subscription object if it exists
        if (subRes.data && !subRes.data.message) {
          setSubscription(subRes.data);
        } else {
          setSubscription(null);
        }
      } catch (error) {
        console.error("Failed to fetch subscription data", error);
      } finally {
        setLoading(false);
      }
    };
  
    const cancelSubscription = async () => {
      if (!window.confirm("Are you sure you want to cancel your subscription?")) return;
      try {
        await API.post("/subscriptions/cancel");
        alert("Subscription cancelled successfully!");
        fetchData();
      } catch (error) {
        console.error(error);
        alert("Failed to cancel subscription.");
      }
    };
  
    // Helper function to find the course name using the plan_id
    const getPlanName = (id: number) => {
      const plan = plans.find(p => p.id === id);
      return plan ? plan.name : "Unknown Plan";
    };
  
    // Status check: Compares the extracted expiry_date from DB with the current date
    const checkStatus = (expiryDate: string) => {
      const today = new Date();
      const expiry = new Date(expiryDate);
      // Row 29 expires on March 21. Today is March 12. 21 > 12, so it's Active.
      return expiry > today ? "Active" : "Expired";
    };
  
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-x-hidden font-sans">
        <Navbar />
  
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tight">My Subscription</h1>
            <p className="text-slate-400 mt-2">Personalized course access details based on your current plan.</p>
          </header>
  
          {loading ? (
            <div className="flex items-center gap-3 bg-slate-800/50 p-6 rounded-2xl w-fit border border-slate-700">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 font-medium tracking-wide">Syncing with database...</p>
            </div>
          ) : subscription ? (
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl max-w-md relative overflow-hidden group">
              {/* Background design blob */}
              <div className="absolute top-0 right-0 p-16 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all duration-500"></div>
              
              <h2 className="text-xl text-white font-semibold mb-8 relative z-10 flex items-center gap-2">
                <span className="text-blue-400">🛡️</span> Plan Details
              </h2>
              
              <div className="space-y-8 mb-10 relative z-10">
                <div className="flex flex-col">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Course Subscribed</p>
                  <p className="text-white text-3xl font-black uppercase tracking-tight">
                    {getPlanName(subscription.plan_id)}
                  </p>
                </div>
  
                <div className="flex flex-col">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Current Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${checkStatus(subscription.expiry_date) === "Active" ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" : "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"}`}></div>
                    <p className={`text-xl font-bold ${checkStatus(subscription.expiry_date) === "Active" ? "text-green-400" : "text-red-400"}`}>
                      {checkStatus(subscription.expiry_date)}
                    </p>
                  </div>
                </div>
  
                <div className="flex flex-col">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Expiration Date</p>
                  <div className="bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-700 w-fit">
                    <p className="text-white text-lg font-semibold">
                      {/* DISPLAYING THE EXTRACTED EXPIRY DATE FROM DB */}
                      {new Date(subscription.expiry_date).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
  
              <button
                onClick={cancelSubscription}
                className="w-full bg-slate-900 hover:bg-red-600 text-red-400 hover:text-white py-4 rounded-2xl font-bold transition-all duration-300 border border-slate-700 hover:border-transparent active:scale-[0.98] relative z-10"
              >
                Cancel Subscription
              </button>
            </div>
          ) : (
            <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 border-dashed p-16 rounded-[2rem] text-center max-w-lg">
              <div className="text-6xl mb-6 grayscale opacity-40">🎫</div>
              <h3 className="text-2xl text-white font-bold mb-4">No Active Plans Found</h3>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">It looks like you don't have any current subscriptions in our records.</p>
              <button 
                onClick={() => window.location.href='/plans'}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/40 active:scale-[0.98]"
              >
                Browse Available Plans
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }