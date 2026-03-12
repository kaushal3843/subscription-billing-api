import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration successful!");

      navigate("/");

    }
    catch{
      alert("Registration failed");
    }
  };

  return(

    <div className="flex h-screen items-center justify-center bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl w-96">

        <h2 className="text-white text-2xl mb-4">
          Register
        </h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 rounded"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 rounded"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 rounded"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Register
        </button>

      </div>

    </div>
  )
}