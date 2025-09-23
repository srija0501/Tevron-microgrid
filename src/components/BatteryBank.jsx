import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const BatteryBank = () => {
  const { t } = useTranslation();

  const [batteries] = useState([
    { id: 1, name: "Battery-1", temperature: 31.5, current: 5.2, voltage: 48.1, level: 85 },
    { id: 2, name: "Battery-2", temperature: 29.8, current: 4.7, voltage: 47.4, level: 72 },
    { id: 3, name: "Battery-3", temperature: 33.0, current: 5.5, voltage: 49.0, level: 90 },
    { id: 4, name: "Battery-4", temperature: 28.6, current: 4.3, voltage: 46.5, level: 64 },
    { id: 5, name: "Battery-5", temperature: 30.2, current: 4.9, voltage: 47.8, level: 77 },
    { id: 6, name: "Battery-6", temperature: 32.4, current: 5.1, voltage: 48.5, level: 88 }
  ]);

  const levelColor = (level) => {
    if (level > 75) return "bg-green-500";
    if (level > 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <h1 className="text-3xl font-bold text-white mb-6">
        {t("battery.title", "Battery Bank")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {batteries.map((battery) => (
          <div
            key={battery.id}
            className="bg-gray-100 rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{battery.name}</h2>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${levelColor(battery.level)} text-white`}
              >
                {battery.level}%
              </span>
            </div>

            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex justify-between">
                <span className="font-medium">{t("battery.temperature")}:</span>
                <span>{battery.temperature} °C</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">{t("battery.current")}:</span>
                <span>{battery.current} A</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">{t("battery.voltage")}:</span>
                <span>{battery.voltage} V</span>
              </li>
             
            </ul>

            <div className="mt-4 w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full ${levelColor(battery.level)}`}
                style={{ width: `${battery.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatteryBank;
