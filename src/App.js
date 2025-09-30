import React, { useState } from "react";
import Layout from "./components/Layout";
import MainDashboard from "./components/MainDashboard";
import SolarDashboard from "./components/SolarDashboard";
import WindDashboard from "./components/WindDashboard";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import BatteryBank from "./components/BatteryBank";
import AddCredits from "./components/AddCredits";
import "./i18n";

function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleNavigate = (page) => setCurrentPage(page);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "solar":
        return <SolarDashboard />;
      case "wind":
        return <WindDashboard />;
      case "battery":
        return <BatteryBank />;
      case "addCredits":
        return <AddCredits />;
      default:
        return <MainDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {!loggedIn ? (
        showSignup ? (
          <SignupPage
            onSignup={() => setLoggedIn(true)}
            onNavigateToLogin={() => setShowSignup(false)}
          />
        ) : (
          <LoginPage
            onLogin={() => setLoggedIn(true)}
            onNavigateToSignup={() => setShowSignup(true)}
          />
        )
      ) : (
        <Layout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={() => setLoggedIn(false)}
        >
          {renderCurrentPage()}
        </Layout>
      )}
    </div>
  );
}

export default App;
