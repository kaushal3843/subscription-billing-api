import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
 
export default function Register(): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
 
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 flex items-center justify-center p-6 overflow-x-hidden font-sans">
      
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
 
      <div className="relative w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold tracking-tight">Subscription App</h1>
          <p className="text-slate-400 mt-2">Join us today! Create your account below.</p>
        </div>
 
        
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10">
          <h2 className="text-white text-xl font-semibold mb-8">Create an account</h2>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="text-slate-400 text-sm font-medium block mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full p-3.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </div>
 
            <div>
              <label className="text-slate-400 text-sm font-medium block mb-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full p-3.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                "Get Started"
              )}
            </button>
          </form>
 
          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <span
                className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition"
                onClick={() => navigate("/")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}