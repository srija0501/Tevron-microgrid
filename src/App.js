import React, { useState } from "react";
import DashboardPage from "./components/DashboardPage";
import StoragePage from "./components/Storage";
import AlertsPage from "./components/AlertsPage";
import Navbar from "./components/Navbar";

import "./i18n";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar setPage={setPage} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {page === "dashboard" && <DashboardPage />}
        {page === "alerts" && <AlertsPage />}
      </div>
    </div>
  );
}

export default App;
