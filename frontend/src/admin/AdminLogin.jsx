import React, { useState } from 'react';
import { loginAdmin } from '../services/newsService'; // ✅ Make sure path is correct
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(email, password);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md border border-[#dd3333]">
        <h2 className="text-2xl font-bold text-[#dd3333] mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-black text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 text-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 text-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#dd3333] text-white font-semibold py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
