import React, { useState } from 'react';
import Layout from './components/Layout';
import MainDashboard from './components/MainDashboard';
import SolarDashboard from './components/SolarDashboard';
import WindDashboard from './components/WindDashboard';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState('login'); // 'login' or 'signup'

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPage('login');
  };

  const handleNavigateToSignup = () => {
    setAuthPage('signup');
  };

  const handleNavigateToLogin = () => {
    setAuthPage('login');
  };

  const handleSignup = (userData) => {
    // Handle signup logic here
    console.log('User signed up:', userData);
    setIsAuthenticated(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'solar':
        return <SolarDashboard />;
      case 'wind':
        return <WindDashboard />;
      default:
        return <MainDashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isAuthenticated) {
    if (authPage === 'signup') {
      return <SignupPage onSignup={handleSignup} onNavigateToLogin={handleNavigateToLogin} />;
    }
    return <LoginPage onLogin={handleLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout}>
      {renderCurrentPage()}
    </Layout>
  );
};

export default App;