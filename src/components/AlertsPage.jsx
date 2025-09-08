import React from "react";
import { useTranslation } from "react-i18next";

const AlertsPage = () => {
  const { t } = useTranslation();

  // Alerts based on the microgrid problem statement
  const alerts = [
    {
      id: 1,
      type: "⚠️",
      message: t("alerts.lowBattery"),
      status: "critical",
      description: t("alerts.lowBatteryDesc"),
    },
    {
      id: 2,
      type: "⚡",
      message: t("alerts.overload"),
      status: "warning",
      description: t("alerts.overloadDesc"),
    },
    {
      id: 3,
      type: "🔧",
      message: t("alerts.maintenanceRequired"),
      status: "warning",
      description: t("alerts.maintenanceDesc"),
    },
    {
      id: 4,
      type: "✅",
      message: t("alerts.systemHealthy"),
      status: "ok",
      description: t("alerts.systemHealthyDesc"),
    },
    {
      id: 5,
      type: "🔋",
      message: t("alerts.batteryFull"),
      status: "ok",
      description: t("alerts.batteryFullDesc"),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{t("alerts.title")}</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded shadow bg-white border-l-4 transition-all hover:shadow-lg ${
              alert.status === "critical"
                ? "border-red-500"
                : alert.status === "warning"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <p className="font-semibold text-lg">
              {alert.type} {alert.message}
            </p>
            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
