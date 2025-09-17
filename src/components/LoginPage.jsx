import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const mockUser = {
    username: "admin",
    password: "1234",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === mockUser.username && password === mockUser.password) {
      setError("");
      onLogin(); // success callback
    } else {
      setError("Invalid username or password");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // For demo purposes, just show a message
    setError("Registration functionality would be implemented here");
    setTimeout(() => setError(""), 3000);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-300 to-teal-600 animate-gradient-x">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.02] duration-300 border border-green-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        
       
        
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2 relative z-10">
          TevrON Dashboard
        </h2>
        <p className="text-center text-gray-600 mb-6 relative z-10">Sign in to access the control panel</p>
        
        <form onSubmit={isRegistering ? handleRegister : handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
              placeholder="Enter username"
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
          
          {error && (
            <div className={`p-3 rounded-lg text-center ${
              error.includes("Invalid") ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            }`}>
              {error}
            </div>
          )}
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {isRegistering ? "Register" : "Login"}
            </button>
            
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="flex-1 border border-green-500 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition duration-300 shadow-sm"
            >
              {isRegistering ? "Back to Login" : "Register"}
            </button>
          </div>
        </form>
        
        
      </div>

      {/* Add custom CSS for the animated gradient */}
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

export default LoginPage;