import React from "react";
import { useTranslation } from "react-i18next";

const Navbar = ({ setPage, currentPage }) => {
  const { t, i18n } = useTranslation();

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* App Title with Icon */}
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h1 className="text-xl font-bold text-white">Solar Microgrid</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setPage("dashboard")}
          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
            currentPage === "dashboard" 
              ? "bg-white text-green-800 shadow-md font-semibold" 
              : "hover:bg-green-600 text-green-100"
          }`}
        >
          <svg  className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {t("dashboard")}
        </button>
        
        {/* Alerts Page Button */}
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
        <div className="relative ml-4">
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-green-600 border border-green-500 text-white pl-9 pr-8 py-2 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            defaultValue={i18n.language}
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="or">ଓଡ଼ିଆ</option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
