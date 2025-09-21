import React, { useState } from "react";

const SignupPage = ({ onSignup, onNavigateToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ Call parent callback or your signup API here
    setError("");
    onSignup?.({ name, email, password });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-300 to-teal-600 animate-gradient-x">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.02] duration-300 border border-green-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>

        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2 relative z-10">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6 relative z-10">
          Sign up to access the TevrON Dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
              placeholder="Confirm password"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg text-center bg-red-100 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md flex items-center justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 21v-2a4 4 0 00-3-3.87M12 3a4 4 0 014 4v1a4 4 0 01-4 4 4 4 0 01-4-4V7a4 4 0 014-4z"
              />
            </svg>
            Sign Up
          </button>

          <button
            type="button"
            onClick={onNavigateToLogin}
            className="w-full border border-green-500 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition duration-300 shadow-sm"
          >
            Back to Login
          </button>
        </form>
      </div>

      {/* Reuse the animated gradient keyframes */}
      <style jsx>{`
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
