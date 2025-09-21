import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Layout = ({ children, currentPage, onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const menuItems = [
    { 
      id: 'main', 
      nameKey: 'layout.mainDashboard',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
      color: 'bg-gradient-to-r from-slate-500 to-blue-600'
    },
    { 
      id: 'solar', 
      nameKey: 'layout.solarPower',
      icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'bg-gradient-to-r from-orange-500 to-yellow-600'
    },
    { 
      id: 'wind', 
      nameKey: 'layout.windPower',
      icon: 'M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2',
      color: 'bg-gradient-to-r from-emerald-500 to-blue-600'
    },
     {
      id: 'battery',
      nameKey: 'battery.title',    // add this key to your i18n files
      icon: 'M4 7h16a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1zm16 3h1a1 1 0 010 2h-1', 
      color: 'bg-gradient-to-r from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Sidebar */}
      <div className={`flex flex-col justify-between bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'} border-r-2 border-gray-200`}>
        {/* Header */}
        <div>
          <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
              <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
                <h2 className="text-lg font-bold">{t("layout.energyControl")}</h2>
                <p className="text-purple-100 text-sm">{t("layout.tevrONSystem")}</p>
              </div>
              <div className="flex items-center gap-2">
              
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full mb-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  currentPage === item.id
                    ? `${item.color} text-white shadow-lg scale-105`
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                <div className={`flex items-center ${sidebarOpen ? 'p-4' : 'p-3 justify-center'}`}>
                  <div className={`${sidebarOpen ? 'p-3' : 'p-2'} rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'bg-slate-600 shadow-sm'}`}>
                    <svg className={`${sidebarOpen ? 'w-6 h-6' : 'w-5 h-5'} ${currentPage === item.id ? 'text-white' : 'text-slate-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  {sidebarOpen && (
                    <div className="ml-4 text-left">
                      <div className="font-bold text-lg">{t(item.nameKey)}</div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className={`${sidebarOpen ? 'p-4' : 'p-2'} border-t border-gray-200 space-y-3`}>
          {sidebarOpen && (
            <div className="space-y-2 text-slate-300 text-sm">
              <button className="w-full text-left hover:text-white transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t("layout.contactUs")}
              </button>
              <button className="w-full text-left hover:text-white transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {t("layout.support")}
              </button>
            </div>
          )}
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center ${sidebarOpen ? 'gap-2 py-3' : 'py-2'} rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors`}
          >
            <svg className={`${sidebarOpen ? 'w-5 h-5' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            {sidebarOpen && <span>{t("layout.logout")}</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
