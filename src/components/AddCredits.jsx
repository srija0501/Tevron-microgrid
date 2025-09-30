import React, { useState } from "react";
import {
  CreditCard,
  ArrowUpCircle,
  ArrowDownCircle,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// EnergyCreditPage.jsx
export default function EnergyCreditPage() {
  const [credits, setCredits] = useState(1200);
  const [balanceKWh, setBalanceKWh] = useState(48);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "sell", points: 200, kwh: 8, date: "2025-09-28 09:12" },
    { id: 2, type: "sell", points: 500, kwh: 20, date: "2025-09-26 18:40" },
    { id: 3, type: "buy", points: -100, kwh: -4, date: "2025-09-21 07:55" },
  ]);
  const [sellAmount, setSellAmount] = useState(5);
  const [buyPoints, setBuyPoints] = useState(200);
  const POINTS_PER_KWH = 25;

  function addTransaction(tx) {
    setTransactions((t) => [tx, ...t].slice(0, 20));
  }

  function sellToGrid() {
    if (sellAmount <= 0) return;
    if (sellAmount > balanceKWh) {
      alert("You don't have that much stored energy to sell.");
      return;
    }
    const earnedPoints = Math.round(sellAmount * POINTS_PER_KWH);
    const tx = {
      id: Date.now(),
      type: "sell",
      points: earnedPoints,
      kwh: sellAmount,
      date: new Date().toLocaleString(),
    };
    setCredits((c) => c + earnedPoints);
    setBalanceKWh((b) => Math.round((b - sellAmount) * 100) / 100);
    addTransaction(tx);
  }

  function buyEnergyWithPoints() {
    if (buyPoints <= 0) return;
    if (buyPoints > credits) {
      alert("Insufficient points — earn by selling excess power to the grid.");
      return;
    }
    const kwhBought = Math.round((buyPoints / POINTS_PER_KWH) * 100) / 100;
    const tx = {
      id: Date.now(),
      type: "buy",
      points: -buyPoints,
      kwh: kwhBought * -1,
      date: new Date().toLocaleString(),
    };
    setCredits((c) => c - buyPoints);
    setBalanceKWh((b) => Math.round((b + kwhBought) * 100) / 100);
    addTransaction(tx);
  }

  function exportHistory() {
    const header = ["id", "type", "points", "kwh", "date"];
    const rows = transactions.map((r) => [r.id, r.type, r.points, r.kwh, r.date]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "energy-credit-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-gray-100 rounded-2xl shadow-md p-4 flex items-center gap-4 border border-gray-200">
      <div className="p-3 bg-gray-200 rounded-xl text-gray-800">{icon}</div>
      <div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );

  // Chart sample data
  const chartData = [
    { day: "D1", credits: 40, energy: 35 },
    { day: "D2", credits: 60, energy: 55 },
    { day: "D3", credits: 50, energy: 48 },
    { day: "D4", credits: 70, energy: 65 },
    { day: "D5", credits: 30, energy: 28 },
    { day: "D6", credits: 55, energy: 50 },
    { day: "D7", credits: 65, energy: 60 },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Energy Credit Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={exportHistory}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-200"
            title="Export transaction history"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Credits"
          value={`${credits} pts`}
          icon={<CreditCard size={20} />}
        />
        <StatCard
          title="Stored Energy"
          value={`${balanceKWh} kWh`}
          icon={<ArrowDownCircle size={20} />}
        />
        <StatCard
          title="Estimated Value"
          value={`≈ ${Math.round((credits / POINTS_PER_KWH) * 100) / 100} kWh`}
          icon={<ArrowUpCircle size={20} />}
        />
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Sell Section */}
        <div className="bg-gray-100 rounded-2xl p-6 shadow-md border border-gray-200 text-gray-900">
          <h2 className="text-lg font-semibold mb-3">Sell Excess Power to Grid</h2>
          <p className="text-sm text-gray-700 mb-4">
            Convert stored kWh into credit points. Points can be redeemed later
            for energy.
          </p>

          <div className="flex gap-3 items-center">
            <label className="text-sm">kWh to sell</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={sellAmount}
              onChange={(e) => setSellAmount(parseFloat(e.target.value))}
              className="w-28 rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900"
            />
            <div className="text-sm text-gray-700">
              → Earn{" "}
              <span className="font-medium">
                {Math.round(sellAmount * POINTS_PER_KWH)}
              </span>{" "}
              pts
            </div>
            <button
              onClick={sellToGrid}
              className="ml-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              Sell
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            Business rule: 1 kWh = {POINTS_PER_KWH} points.
          </div>
        </div>

        {/* Buy Section */}
        <div className="bg-gray-100 rounded-2xl p-6 shadow-md border border-gray-200 text-gray-900">
          <h2 className="text-lg font-semibold mb-3">Buy Energy Using Points</h2>
          <p className="text-sm text-gray-700 mb-4">
            Spend points to top up your stored energy when production is low.
          </p>

          <div className="flex gap-3 items-center">
            <label className="text-sm">Points to spend</label>
            <input
              type="number"
              min="0"
              step="10"
              value={buyPoints}
              onChange={(e) => setBuyPoints(parseInt(e.target.value || 0))}
              className="w-28 rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900"
            />
            <div className="text-sm text-gray-700">
              → Get{" "}
              <span className="font-medium">
                {Math.round((buyPoints / POINTS_PER_KWH) * 100) / 100}
              </span>{" "}
              kWh
            </div>
            <button
              onClick={buyEnergyWithPoints}
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              Buy
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            Tip: Use credits earned during high-generation periods to cover
            nights or cloudy days.
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {/* Transactions */}
        <div className="bg-gray-100 rounded-2xl p-6 shadow-md border border-gray-200 text-gray-900">
          <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
          <div className="space-y-3 max-h-64 overflow-auto">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      t.type === "sell"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {t.type === "sell" ? (
                      <ArrowUpCircle size={18} />
                    ) : (
                      <ArrowDownCircle size={18} />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {t.type === "sell" ? "Sold to Grid" : "Bought Energy"}
                    </div>
                    <div className="text-xs text-gray-500">{t.date}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-800">
                  <div>{t.points} pts</div>
                  <div className="text-xs text-gray-500">{t.kwh} kWh</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage & Forecast with Recharts */}
        <div className="bg-gray-100 rounded-2xl p-6 shadow-md border border-gray-200 text-gray-900">
          <h3 className="text-lg font-semibold mb-3">Usage & Forecast</h3>
          <p className="text-sm text-gray-700 mb-4">
            Live comparison of stored energy (kWh) and credit points.
          </p>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="energy" fill="#60a5fa" name="Stored kWh" />
                <Line
                  type="monotone"
                  dataKey="credits"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Credits"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            Blue bars = stored kWh; green line = earned credits.
          </div>
        </div>
      </section>

      <footer className="mt-6 text-center text-xs text-gray-400">
        Rules shown here (1 kWh = {POINTS_PER_KWH} pts) are for demo only —
        connect to backend rates & billing logic.
      </footer>
    </div>
  );
}
