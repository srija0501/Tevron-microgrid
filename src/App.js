import React, { useState } from "react";
import DashboardPage from "./components/DashboardPage";
import StoragePage from "./components/Storage";
import AlertsPage from "./components/AlertsPage";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage"; // 👈 import login page

import "./i18n";

function App() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false); // 👈 track login state

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* If not logged in → show login page */}
      {!loggedIn ? (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      ) : (
        <>
          {/* Navbar */}
          <Navbar setPage={setPage} />

          {/* Main Content */}
          <div className="flex-1 p-6">
            {page === "dashboard" && <DashboardPage />}
            {page === "alerts" && <AlertsPage />}
            {page === "storage" && <StoragePage />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
