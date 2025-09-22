import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SiteMap from "./SiteMap";

const MainDashboard = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };
 const year = new Date().getFullYear();
  const systemData = {
    solar: { generation: 8.5, batteryLevel: 85, efficiency: 85, status: 'Active' },
    wind: { generation: 4.0, batteryLevel: 70, efficiency: 92, status: 'Active' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl shadow-xl border border-purple-400 text-white">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-yellow-200">{t('main.title')}</span>
            </h1>
            <h2 className="text-2xl font-semibold text-blue-100 mb-1">{t('main.subtitle')}</h2>
            <p className="text-blue-100 text-lg">{t('main.welcome')}</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm mb-4">
              <div className="text-yellow-200 font-bold text-2xl">{currentTime.toLocaleTimeString()}</div>
              <div className="text-blue-100 text-sm">
                {currentTime.toLocaleDateString(i18n.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            {/* Language Dropdown */}
            <select
              onChange={changeLanguage}
              value={i18n.language}
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="or">ଓଡିଆ</option>
            </select>
          </div>
        </header>

         <div className="mb-8">
          <SiteMap />
        </div>

        {/* Solar Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div
            className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl shadow-lg p-8 text-white transition-all hover:shadow-xl cursor-pointer transform hover:scale-105 border border-orange-200"
            onClick={() => onNavigate('solar')}
          >
            <div className="flex items-center mb-6">
              <div className="rounded-full bg-white/20 p-4 mr-6 backdrop-blur-sm">
                {/* icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{t('main.solarPower')}</h2>
                <p className="text-yellow-100">{t('main.monitorSolar')}</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{systemData.solar.generation} kW</div>
                  <div className="text-yellow-100">{t('main.generation')}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{systemData.solar.batteryLevel}%</div>
                  <div className="text-yellow-100">{t('main.battery')}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <span className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold text-lg flex items-center">
                {t('main.viewDetails')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Wind Card */}
          <div
            className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white transition-all hover:shadow-xl cursor-pointer transform hover:scale-105 border border-emerald-200"
            onClick={() => onNavigate('wind')}
          >
            <div className="flex items-center mb-6">
              <div className="rounded-full bg-white/20 p-4 mr-6 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{t('main.windPower')}</h2>
                <p className="text-green-100">{t('main.monitorWind')}</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{systemData.wind.generation} kW</div>
                  <div className="text-green-100">{t('main.generation')}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{systemData.wind.batteryLevel}%</div>
                  <div className="text-green-100">{t('main.battery')}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <span className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-lg flex items-center">
                {t('main.viewDetails')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-lg p-8 border-2 border-yellow-100">
            <h2 className="text-2xl font-bold text-orange-800 mb-2 flex items-center">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              {t('main.solarGrid')}
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-6 rounded-2xl text-center shadow-lg border-2 border-yellow-200">
                <div className="text-yellow-600 text-sm font-medium mb-1">{t('main.generation')}</div>
                <div className="text-3xl font-bold text-orange-700">{systemData.solar.generation}</div>
                <div className="text-yellow-600 font-medium">kW</div>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center shadow-lg border-2 border-yellow-200">
                <div className="text-yellow-600 text-sm font-medium mb-1">{t('main.battery')}</div>
                <div className="text-3xl font-bold text-orange-700">{systemData.solar.batteryLevel}</div>
                <div className="text-yellow-600 font-medium">%</div>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center shadow-lg border-2 border-yellow-200">
                <div className="text-yellow-600 text-sm font-medium mb-1">{t('main.efficiency')}</div>
                <div className="text-3xl font-bold text-orange-700">{systemData.solar.efficiency}</div>
                <div className="text-yellow-600 font-medium">%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-lg p-8 border-2 border-green-100">
            <h2 className="text-2xl font-bold text-green-800 mb-2 flex items-center">
              <div className="bg-green-400 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                </svg>
              </div>
              {t('main.windGrid')}
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-6 rounded-2xl text-center shadow-lg border-2 border-green-200">
                <div className="text-green-600 text-sm font-medium mb-1">{t('main.generation')}</div>
                <div className="text-3xl font-bold text-green-700">{systemData.wind.generation}</div>
                <div className="text-green-600 font-medium">kW</div>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center shadow-lg border-2 border-green-200">
                <div className="text-green-600 text-sm font-medium mb-1">{t('main.battery')}</div>
                <div className="text-3xl font-bold text-green-700">{systemData.wind.batteryLevel}</div>
                <div className="text-green-600 font-medium">%</div>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center shadow-lg border-2 border-green-200">
                <div className="text-green-600 text-sm font-medium mb-1">{t('main.efficiency')}</div>
                <div className="text-3xl font-bold text-green-700">{systemData.wind.efficiency}</div>
                <div className="text-green-600 font-medium">%</div>
              </div>
            </div>
          </div>
        </div>

       {/* Enhanced Footer */}
 <footer className="bg-white rounded-2xl shadow border-t border-neutral-200 p-6 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
        
        {/* About */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-gray-800 text-lg mb-1">
            {t("footer.aboutTitle")}
          </h3>
          <p className="text-neutral-500 text-sm">
            {t("footer.aboutDescription")}
          </p>
        </div>

        {/* Support */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-gray-800 text-lg mb-1">
            {t("footer.supportTitle")}
          </h3>
          <p className="text-neutral-500 text-sm">
            {t("footer.supportEmailLabel")}:{" "}
            <a
              href={`mailto:${t("footer.supportEmail")}`}
              className="hover:text-blue-600"
            >
              {t("footer.supportEmail")}
            </a>
            <br />
            {t("footer.supportPhoneLabel")}:{" "}
            <a
              href={`tel:${t("footer.supportPhone")}`}
              className="hover:text-blue-600"
            >
              {t("footer.supportPhone")}
            </a>
          </p>
        </div>
        
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-200 mt-4 pt-4 text-center text-neutral-400 text-xs">
        {t("footer.copyright", { year })}
      </div>
    </footer>

      </div>
    </div>
  );
};

export default MainDashboard;
