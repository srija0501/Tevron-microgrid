import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from "recharts";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";


// Sample Data for Wind Dashboard
const windSpeedData = [
  { time: "6 AM", speed: 5.2 },
  { time: "9 AM", speed: 7.8 },
  { time: "12 PM", speed: 9.5 },
  { time: "3 PM", speed: 12.3 },
  { time: "6 PM", speed: 8.7 },
];

const powerOutputData = [
  { hour: "6-7", output: 42 },
  { hour: "7-8", output: 58 },
  { hour: "8-9", output: 65 },
  { hour: "9-10", output: 72 },
  { hour: "10-11", output: 80 },
];

const tempPressureData = [
  { time: "6 AM", temp: 18, pressure: 1013 },
  { time: "9 AM", temp: 20, pressure: 1012 },
  { time: "12 PM", temp: 22, pressure: 1010 },
  { time: "3 PM", temp: 21, pressure: 1011 },
  { time: "6 PM", temp: 19, pressure: 1013 },
];

const turbines = [
  { turbine: "T1", rpm: 24, efficiency: 92 },
  { turbine: "T2", rpm: 22, efficiency: 88 },
  { turbine: "T3", rpm: 15, efficiency: 30 },
  { turbine: "T4", rpm: 21, efficiency: 86 },
];

// Alerts for wind farm
const alerts = [
  { type: "Low Wind", message: "Wind speed below operational threshold", severity: "medium", time: "2h ago" },
  { type: "Maintenance", message: "Turbine T3 requires inspection", severity: "high", time: "1d ago" },
  { type: "Optimal", message: "All systems performing efficiently", severity: "low", time: "Just now" },
];

// Color palette with blues for wind theme
const COLORS = {
   primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  }
};

const ALERT_COLORS = { 
  high: '#ef4444', 
  medium: '#f59e0b', 
  low: '#10b981' 
};

// Example: Energy generation comparison (kWh)
const dailyComparisonData = [
  { day: "Yesterday", wind: 42, battery: 18, grid: 5 },
  { day: "Today", wind: 50, battery: 20, grid: 7 },
];

// Example: Weekly generation (kWh)
const weeklyComparisonData = [
  { week: "Week 1", wind: 280, battery: 130, grid: 35 },
  { week: "Week 2", wind: 300, battery: 140, grid: 40 },
  { week: "Week 3", wind: 320, battery: 150, grid: 45 },
  { week: "Week 4", wind: 290, battery: 135, grid: 38 },
];

// Wind direction data
const windDirectionData = [
  { direction: 'N', speed: 8 },
  { direction: 'NE', speed: 6 },
  { direction: 'E', speed: 4 },
  { direction: 'SE', speed: 5 },
  { direction: 'S', speed: 7 },
  { direction: 'SW', speed: 9 },
  { direction: 'W', speed: 12 },
  { direction: 'NW', speed: 10 },
];

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [lng, setLng] = useState(i18n.language);

  useEffect(() => {
    const onLangChanged = (lng) => setLng(lng);
    i18n.on('languageChanged', onLangChanged);
    return () => i18n.off('languageChanged', onLangChanged);
  }, [i18n]);

  const [currentMetrics, setCurrentMetrics] = useState({
    battery: 0,
    currentGen: 0,
    windSpeed: 0,
    windDirection: 0
  });

  // ✅ Fetch real-time data from Firebase
  useEffect(() => {
    const nodeRef = ref(db, "nodes/WIND_NODE/latest");
    const unsubscribe = onValue(nodeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCurrentMetrics({
          battery: data?.Battery?.Current ?? 0,
          currentGen: data?.Wind?.Output ?? 0,
          windSpeed: data?.Wind?.Speed ?? 0,
          windDirection: data?.Wind?.Direction ?? 0,
        });
      }
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
  const script1 = document.createElement("script");
  script1.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
  script1.defer = true;

  const script2 = document.createElement("script");
  script2.src =
    "https://files.bpcontent.cloud/2025/09/17/16/20250917162809-1RZIY35N.js";
  script2.defer = true;

  document.body.appendChild(script1);
  document.body.appendChild(script2);

  return () => {
    document.body.removeChild(script1);
    document.body.removeChild(script2);
  };
}, []);

 

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getBatteryColor = level => {
    if (level > 70) return COLORS.primary[500];
    if (level > 30) return COLORS.accent[500];
    return "#ef4444";
  };

  const getSeverityColor = severity => ALERT_COLORS[severity] || "gray";
   const year = new Date().getFullYear();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-white border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-bold text-neutral-800">{label}</p>
          {payload.map((entry, i) => (
            <p key={i} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Data for energy distribution pie chart
  const energyDistributionData = [
    { name: "Wind", value: 75, color: COLORS.accent[500] },
    { name: "Battery", value: 20, color: COLORS.primary[500] },
    { name: "Grid", value: 5, color: COLORS.secondary[500] },
  ];
  
  const [view, setView] = useState("daily");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl shadow-lg border border-emerald-400 text-white">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {t("wind.title")}
            </h1>
            <p className="text-emerald-100">
              {t("wind.subtitle")}
            </p>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold text-lg">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="text-emerald-100 text-sm">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </header>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Generation */}
          <div className="p-6 bg-white rounded-2xl shadow-md border-l-4 border-blue-500 transition-all hover:shadow-lg">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-600 font-medium">{t("wind.currentGeneration")}</p>
                <p className="text-2xl font-bold text-neutral-800">
                  {currentMetrics.currentGen.toFixed(2)} kW
                </p>
              </div>
            </div>
          </div>

          {/* Battery */}
          <div className="p-6 bg-white rounded-2xl shadow-md border-l-4 border-green-500 transition-all hover:shadow-lg">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-600 font-medium">{t("wind.batteryLevel")}</p>
                <p className="text-2xl font-bold text-neutral-800">{currentMetrics.battery}%</p>
              </div>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full mt-3">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${currentMetrics.battery}%`,
                  backgroundColor: getBatteryColor(currentMetrics.battery),
                }}
              ></div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="p-6 bg-white rounded-2xl shadow-md border-l-4 border-indigo-500 transition-all hover:shadow-lg">
            <div className="flex items-center">
              <div className="rounded-full bg-indigo-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-600 font-medium">{t("wind.windSpeed")}</p>
                <p className="text-2xl font-bold text-neutral-800">{currentMetrics.windSpeed} m/s</p>
              </div>
            </div>
          </div>

          {/* Wind Direction */}
          <div className="p-6 bg-white rounded-2xl shadow-md border-l-4 border-purple-500 transition-all hover:shadow-lg">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-600 font-medium">{t("wind.windDirection")}</p>
                <p className="text-2xl font-bold text-neutral-800">{currentMetrics.windDirection}°</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
            <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
              <span className="w-2 h-5 bg-blue-500 rounded mr-2"></span>
              {t("wind.turbinesStatus")}
            </h2>
            <div className="space-y-5 mt-6">
              {turbines.map((turbine, idx) => (
                <div key={idx} className="relative group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-neutral-700">{turbine.turbine}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: COLORS.secondary[700] }}
                    >
                      {turbine.rpm} RPM · {turbine.efficiency}% {t("wind.efficiency")}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${turbine.efficiency}%`,
                        backgroundColor:
                          turbine.efficiency > 90
                            ? COLORS.primary[500]
                            : turbine.efficiency > 80
                            ? COLORS.accent[500]
                            : "#ef4444",
                      }}
                    ></div>
                  </div>
                  {/* Hover Tooltip */}
                  <div className="absolute left-0 top-full mt-2 bg-slate-800 text-white p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 min-w-48">
                    <div className="text-sm font-semibold mb-2">{turbine.turbine} Details</div>
                    <div className="space-y-1 text-xs">
                      <div>Battery: {currentMetrics.battery}%</div>
                      <div>Current: {currentMetrics.currentGen.toFixed(2)} kW</div>
                      <div>Wind Speed: {currentMetrics.windSpeed} m/s</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
         

          {/* Power Output */}
          <div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
            <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
              <span className="w-2 h-5 bg-indigo-500 rounded mr-2"></span>
              {t("wind.powerOutput")}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={powerOutputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="hour" />
                <YAxis unit="kW" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="output" 
                  stroke={COLORS.accent[500]} 
                  strokeWidth={2} 
                  name={t("wind.powerOutput")} 
                  unit=" kW"
                  dot={{ fill: COLORS.accent[500], strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6, fill: COLORS.accent[600] }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

           {/* Wind Speed Chart */}
          <div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
            <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
              <span className="w-2 h-5 bg-blue-500 rounded mr-2"></span>
              {t("wind.windSpeed")}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={windSpeedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="time" />
                <YAxis unit="m/s" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="speed" 
                  stroke={COLORS.primary[500]} 
                  fill={COLORS.primary[100]} 
                  fillOpacity={0.5} 
                  name={t("wind.windSpeed")}
                  unit=" m/s"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        
           {/* Energy Comparison */}
          <div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
                <span className="w-2 h-5 bg-orange-500 rounded mr-2"></span>
                {t("wind.energyComparison")}
              </h2>
              <div>
                <button 
                  onClick={() => setView("daily")} 
                  className={`px-3 py-1 rounded-l ${view==="daily" ? "bg-orange-500 text-white" : "bg-neutral-100"}`}
                >
                  {t("wind.daily")}
                </button>
                <button 
                  onClick={() => setView("weekly")} 
                  className={`px-3 py-1 rounded-r ${view==="weekly" ? "bg-orange-500 text-white" : "bg-neutral-100"}`}
                >
                  {t("wind.weekly")}
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={view === "daily" ? dailyComparisonData : weeklyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={view === "daily" ? "day" : "week"} 
                  tickFormatter={tick => t(`wind.${tick}`)} 
                />
                <YAxis unit="kWh" />
                <Tooltip 
                  formatter={(value, name) => [value, t(`wind.${name}`)]} 
                  labelFormatter={label => t(`wind.${label}`)}
                />
                <Legend formatter={value => t(`wind.${value}`)} />
                <Bar dataKey="wind" fill={COLORS.accent[500]} name={t("wind.Wind")} radius={[15, 15, 0, 0]} />
                <Bar dataKey="battery" fill={COLORS.primary[500]} name={t("wind.Battery")} radius={[15, 15, 0, 0]} />
                <Bar dataKey="grid" fill={COLORS.secondary[500]} name={t("wind.Grid")} radius={[15, 15, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
         </div>

        

        {/* Alerts */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8 transition-all hover:shadow-lg">
          <h2 className="font-semibold text-lg text-red-600 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {t("wind.systemAlerts")}
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div 
                key={idx} 
                className="p-4 border-l-4 rounded-r-lg flex items-start transition-all hover:shadow-sm"
                style={{ 
                  borderLeftColor: getSeverityColor(alert.severity), 
                  backgroundColor: `${getSeverityColor(alert.severity)}08` 
                }}
              >
                <div 
                  className="rounded-full p-2 mr-3 mt-0.5" 
                  style={{ backgroundColor: `${getSeverityColor(alert.severity)}90` }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke={getSeverityColor(alert.severity)}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={alert.severity === 'high' 
                        ? "M5 13l4 4L19 7" 
                        : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      } 
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-800">
                      {t(`wind.${alert.type}`)}
                    </span>
                    <span className="text-xs text-neutral-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">
                    {t(`wind.${alert.message}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* Footer */}
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

export default Dashboard;