import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

const Storage = () => {
  const { t } = useTranslation();

  const batteryData = [
    { time: t("storagePage.times.8AM"), charge: 80 },
    { time: t("storagePage.times.10AM"), charge: 85 },
    { time: t("storagePage.times.12PM"), charge: 90 },
    { time: t("storagePage.times.2PM"), charge: 75 },
    { time: t("storagePage.times.4PM"), charge: 60 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t("storagePage.title")}</h1>

      <div className="bg-white shadow rounded p-4 h-72">
        <h3 className="font-semibold mb-2">{t("storagePage.chartTitle")}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={batteryData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="charge" stroke="#4CAF50" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 bg-white shadow rounded p-4">
        <p className="text-lg">
          {t("storagePage.currentBattery")}:{" "}
          <span className="font-bold text-green-600">70%</span>
        </p>
        <p>
          {t("storagePage.estimatedBackup")}: <span className="font-bold">5 hours</span>
        </p>
        <p>
          {t("storagePage.status")}: Healthy
        </p>
      </div>
    </div>
  );
};

export default Storage;
