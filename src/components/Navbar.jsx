import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = ({ setPage, currentPage }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-800 text-white px-4 sm:px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-lg font-bold">TevrON</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => setPage("dashboard")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
              currentPage === "dashboard" 
                ? "bg-white text-green-800 shadow-md font-semibold" 
                : "hover:bg-green-600 text-green-100"
            }`}
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10h3m10-11l2 2m-2-2v10h-3m-6 0h6" />
            </svg>
            {t("dashboard")}
          </button>

          <button
            onClick={() => setPage("alerts")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
              currentPage === "alerts" 
                ? "bg-white text-green-800 shadow-md font-semibold" 
                : "hover:bg-green-600 text-green-100"
            }`}
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1 8h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
            </svg>
            {t("alerts.title")}
          </button>

          {/* Language Selector */}
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-green-600 border border-green-500 text-white px-3 py-2 rounded-lg focus:outline-none"
            defaultValue={i18n.language}
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="or">ଓଡ଼ିଆ</option>
             <option value="ta">தமிழ்</option>
          </select>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mt-3 flex flex-col space-y-2 md:hidden">
          <button
            onClick={() => setPage("dashboard")}
            className={`px-4 py-2 rounded-lg ${
              currentPage === "dashboard" 
                ? "bg-white text-green-800 shadow-md font-semibold" 
                : "hover:bg-green-600 text-green-100"
            }`}
          >
            {t("dashboard")}
          </button>

          <button
            onClick={() => setPage("alerts")}
            className={`px-4 py-2 rounded-lg ${
              currentPage === "alerts" 
                ? "bg-white text-green-800 shadow-md font-semibold" 
                : "hover:bg-green-600 text-green-100"
            }`}
          >
            {t("alerts.title")}
          </button>

          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-green-600 border border-green-500 text-white px-3 py-2 rounded-lg focus:outline-none"
            defaultValue={i18n.language}
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="or">ଓଡ଼ିଆ</option>
          </select>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
