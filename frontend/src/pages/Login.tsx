import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Logic for actual login
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // Saving both token and role for the dynamic navbar logic
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      
      if (res.data.role === "admin") {
        navigate("/admin/dashboard"); // Send admin here
      } else {
        navigate("/dashboard"); // Send regular users here
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 flex items-center justify-center p-6 overflow-x-hidden font-sans">
      {/* Background Decoration Circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative w-full max-w-md">
        {/* Branding Header */}
        <div className="text-center mb-8">
         { /*<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/40 mb-4 transform -rotate-6">
            <span className="text-white text-3xl font-bold">S</span>
          </div>*/}
          <h1 className="text-white text-3xl font-bold tracking-tight">Subscription App</h1>
          <p className="text-slate-400 mt-2">Welcome back! Please enter your details.</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10">
          <h2 className="text-white text-xl font-semibold mb-8">Login to your account</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-slate-400 text-sm font-medium block mb-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full p-3.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm font-medium block mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full p-3.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

        

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <span
                className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition"
                onClick={() => navigate("/register")}
              >
                Register for free
              </span>
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}