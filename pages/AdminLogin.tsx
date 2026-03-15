import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded auth for demo purposes
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-brand-pink mb-2">L'Odeur</h1>
          <p className="text-gray-400">Admin Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-brand-pink transition-colors"
              placeholder="Enter admin password"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-brand-pink text-brand-chocolate font-bold py-3 rounded hover:bg-white transition-colors uppercase tracking-widest"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
