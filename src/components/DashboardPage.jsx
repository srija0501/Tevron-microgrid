import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase"; // ✅ your firebase.js
import { useTranslation } from "react-i18next";
// Sample Data
const batteryData = [
  { time: "6 AM", level: 80 },
  { time: "9 AM", level: 90 },
  { time: "12 PM", level: 70 },
  { time: "3 PM", level: 60 },
  { time: "6 PM", level: 50 },
];

const generationData = [
  { hour: "6-7", current: 4.2 },
  { hour: "7-8", current: 4.5 },
  { hour: "8-9", current: 3.8 },
  { hour: "9-10", current: 4.0 },
  { hour: "10-11", current: 4.1 },
];

const tempMoistureData = [
  { time: "6 AM", temp: 28, moisture: 45 },
  { time: "9 AM", temp: 30, moisture: 42 },
  { time: "12 PM", temp: 33, moisture: 38 },
  { time: "3 PM", temp: 32, moisture: 35 },
  { time: "6 PM", temp: 29, moisture: 40 },
];

const solarPanels = [
  { panel: "P1", voltage: 36, efficiency: 92 },
  { panel: "P2", voltage: 34, efficiency: 88 },
  { panel: "P3", voltage: 25, efficiency: 30 },
  { panel: "P4", voltage: 33, efficiency: 86 },
];

// Alerts
const alerts = [
  { type: "Battery Low", message: "Battery below 20%", severity: "high", time: "2h ago" },
  { type: "Maintenance", message: "Clean solar panels", severity: "medium", time: "1d ago" },
  { type: "Optimal", message: "System performing at peak", severity: "low", time: "Just now" },
];

// Color palette
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
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
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
  { day: "Yesterday", solar: 42, battery: 18, grid: 5 },
  { day: "Today", solar: 50, battery: 20, grid: 7 },
];

// Example: Weekly generation (kWh)
const weeklyComparisonData = [
  { week: "Week 1", solar: 280, battery: 130, grid: 35 },
  { week: "Week 2", solar: 300, battery: 140, grid: 40 },
  { week: "Week 3", solar: 320, battery: 150, grid: 45 },
  { week: "Week 4", solar: 290, battery: 135, grid: 38 },
];


const Dashboard = () => {
  const { t, i18n } = useTranslation();

  const [currentMetrics, setCurrentMetrics] = useState({
    battery: 0,
    currentGen: 0,
    temp: 0,
    moisture: 0
  });

  // ✅ Fetch real-time data from Firebase
  useEffect(() => {
  const nodeRef = ref(db, "nodes/NODE1/latest");
  const unsubscribe = onValue(nodeRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      setCurrentMetrics({
        battery: data?.Battery?.Current ?? 0,
        currentGen: data?.Solar?.Current ?? 0,
        temp: data?.Temperature?.DHT11 ?? 0,  // ⚠️ check if Temperature really exists in DB
        moisture: data?.Humidity ?? 0,
      });
    }
  });
  return () => unsubscribe();
}, []);

   useEffect(() => {
    // ✅ Load Chatbot Script
    window.chtlConfig = { chatbotId: "7751329277" };
    const script = document.createElement("script");
    script.src = "https://chatling.ai/js/embed.js";
    script.async = true;
    script.setAttribute("data-id", "7751329277");
    script.id = "chtl-script";
    document.body.appendChild(script);

    return () => {
      // cleanup when Dashboard unmounts
      document.getElementById("chtl-script")?.remove();
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
    { name: "Solar", value: 75, color: COLORS.accent[500] },
    { name: "Battery", value: 20, color: COLORS.primary[500] },
    { name: "Grid", value: 5, color: COLORS.secondary[500] },
  ];
  const [view, setView] = useState("daily");


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-500 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
       <header className="flex justify-between items-center mb-8 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
  <div>
    <h1 className="text-3xl font-bold text-green-800">
      {t("title")}
    </h1>
    <p className="text-green-600">
      {t("subtitle")}
    </p>
  </div>
  <div className="text-right">
    <div className="text-blue-700 font-semibold text-lg">
      {new Date().toLocaleTimeString()}
    </div>
    <div className="text-neutral-600 text-sm">
      {new Date().toLocaleDateString()}
    </div>
  </div>
</header>


        {/* Metrics */}

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Current Generation */}
      <div className="p-6 bg-white rounded-2xl shadow-md border-l-4 border-yellow-500 transition-all hover:shadow-lg">
        <div className="flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-neutral-600 font-medium">{t("currentGeneration")}</p>
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
            <p className="text-neutral-600 font-medium">{t("batteryLevel")}</p>
            <p className="text-2xl font-bold text-neutral-800">{currentMetrics.battery}A</p>
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

      {/* Temperature */}
      <div className="p-6 bg-white rounded-2xl shadow-md border-l-4 border-blue-500 transition-all hover:shadow-lg">
        <div className="flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-neutral-600 font-medium">{t("temperature")}</p>
            <p className="text-2xl font-bold text-neutral-800">{currentMetrics.temp} °C</p>
          </div>
        </div>
      </div>

      {/* Humidity */}
      <div className="p-6 bg-white rounded-2xl shadow-md border-l-4 border-purple-500 transition-all hover:shadow-lg">
        <div className="flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <div>
            <p className="text-neutral-600 font-medium">{t("moisture")}</p>
            <p className="text-2xl font-bold text-neutral-800">{currentMetrics.moisture}%</p>
          </div>
        </div>
      </div>
    </div>



        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Battery Status */}
         <div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
       <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
       <span className="w-2 h-5 bg-green-500 rounded mr-2"></span>
          {t("batteryStatus")}
       </h2>
       <ResponsiveContainer width="100%" height={250}>
    <AreaChart data={batteryData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis dataKey="time" />
      <YAxis unit="%" />
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="monotone" 
        dataKey="level" 
        stroke={COLORS.primary[500]} 
        fill={COLORS.primary[100]} 
        fillOpacity={0.5} 
        name={t("batteryLevel")}
        unit="%"
      />
    </AreaChart>
  </ResponsiveContainer>
</div>

          {/* Current Generation */}
<div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
  <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
    <span className="w-2 h-5 bg-yellow-500 rounded mr-2"></span>
    {t("todaysCurrentGeneration")}
  </h2>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={generationData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis dataKey="hour" />
      <YAxis unit="kW" />
      <Tooltip content={<CustomTooltip />} />
      <Line 
        type="monotone" 
        dataKey="current" 
        stroke={COLORS.accent[500]} 
        strokeWidth={2} 
        name={t("currentGeneration")} 
        unit="kW"
        dot={{ fill: COLORS.accent[500], strokeWidth: 2, r: 4 }} 
        activeDot={{ r: 6, fill: COLORS.accent[600] }} 
      />
    </LineChart>
  </ResponsiveContainer>
</div>
</div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
       
{/* Solar Panels Status */}
<div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
  <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
    <span className="w-2 h-5 bg-blue-500 rounded mr-2"></span>
    {t("solarPanelsStatus")}
  </h2>
  <div className="space-y-5 mt-6">
    {solarPanels.map((panel, idx) => (
      <div key={idx}>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-neutral-700">{panel.panel}</span>
          <span
            className="text-sm font-semibold"
            style={{ color: COLORS.secondary[700] }}
          >
            {panel.voltage} V · {panel.efficiency}% {t("efficiency")}
          </span>
        </div>
        <div className="w-full h-3 bg-neutral-100 rounded-full">
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${panel.efficiency}%`,
              backgroundColor:
                panel.efficiency > 90
                  ? COLORS.primary[500]
                  : panel.efficiency > 80
                  ? COLORS.accent[500]
                  : "#ef4444",
            }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</div>
        
   <div className="bg-white rounded-2xl shadow p-6 transition-all hover:shadow-lg">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-lg text-neutral-800 mb-4 flex items-center">
      <span className="w-2 h-5 bg-orange-500 rounded mr-2"></span>
      {t("energyComparison")}
    </h2>
    <div>
      <button 
        onClick={() => setView("daily")} 
        className={`px-3 py-1 rounded-l ${view==="daily" ? "bg-orange-500 text-white" : "bg-neutral-100"}`}
      >
        {t("daily")}
      </button>
      <button 
        onClick={() => setView("weekly")} 
        className={`px-3 py-1 rounded-r ${view==="weekly" ? "bg-orange-500 text-white" : "bg-neutral-100"}`}
      >
        {t("weekly")}
      </button>
    </div>
  </div>

  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={view === "daily" ? dailyComparisonData : weeklyComparisonData}>
      <CartesianGrid strokeDasharray="3 3" />
      
      {/* X-axis labels translated */}
      <XAxis 
        dataKey={view === "daily" ? "day" : "week"} 
        tickFormatter={tick => t(tick)} 
      />
      
      <YAxis unit="kWh" />
      
      {/* Tooltip translated */}
      <Tooltip 
        formatter={(value, name) => [value, t(name)]} 
        labelFormatter={label => t(label)}
      />
      
      {/* Legend translated */}
      <Legend formatter={value => t(value)} />
      
      {/* Bars with translated names */}
      <Bar dataKey="solar" fill={COLORS.accent[500]} name={t("solar")}  radius={[15, 15, 0, 0]}  />
      <Bar dataKey="battery" fill={COLORS.primary[500]} name={t("battery")}  radius={[15, 15, 0, 0]} />
      <Bar dataKey="grid" fill={COLORS.secondary[500]} name={t("grid")}  radius={[15, 15, 0, 0]} />
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
    {t("systemAlerts")}
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
              {t(alert.type)}
            </span>
            <span className="text-xs text-neutral-500">{alert.time}</span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            {t(alert.message)}
          </p>
        </div>
      </div>
    ))}
  </div>


        </div>

        {/* Footer */}
        <footer className="text-center text-neutral-500 text-sm p-6 bg-white rounded-2xl shadow border-t border-neutral-100">
          <div className="flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Odisha Renewable Energy Initiative • Govt of Odisha
          </div>
          <p>Real-time monitoring for sustainable energy solutions</p>
        </footer>
      </div>
     
    </div>
  );
};

export default Dashboard;