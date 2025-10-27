"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Line,
  Bar,
  Doughnut,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { CircleDollarSign, Calendar, ScanLine, Settings } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartsSection = () => {
  const router = useRouter();

  // 📈 Line chart - Profit Growth over months
  const profitGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Profit ($)",
        data: [200, 450, 600, 900, 1100, 1500],
        borderColor: "#10b981",
        backgroundColor: "rgba(22,163,74,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // 📊 Bar chart - Total Investment vs Profit (by plan)
  const investmentVsProfitData = {
    labels: ["Basic", "Advanced", "Premium"],
    datasets: [
      {
        label: "Total Investment ($)",
        data: [15000, 40000, 75000],
        backgroundColor: "#005b9e",
        borderRadius: 6,
      },
      {
        label: "Total Profit ($)",
        data: [3000, 12000, 32000],
        backgroundColor: "#10b981",
        borderRadius: 6,
      },
    ],
  };

  // 🍩 Doughnut chart - Portfolio Allocation
  const portfolioData = {
    labels: ["Basic", "Advanced", "Premium"],
    datasets: [
      {
        data: [25, 45, 30],
        backgroundColor: [
          "#005b9e", // blue - Basic
          "#10b981", // green - Advanced
          "#f59e0b", // amber - Premium
        ],
        borderColor: "#fff",
        borderWidth: 2,
        cutout: "60%", // makes it a doughnut
      },
    ],
  };

  // ⚡ Quick actions
  const quickActions = [
    {
      label: "View Investments",
      icon: <CircleDollarSign className="text-[#005b9e] w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/investments"),
    },
    {
      label: "Profit Tracking",
      icon: <Calendar className="text-green-500 w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/profit-tracking"),
    },
    {
      label: "Transactions",
      icon: <ScanLine className="text-orange-500 w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/transactions"),
    },
    {
      label: "Settings",
      icon: <Settings className="text-gray-600 w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/settings"),
    },
  ];

  return (
    <section className="grid gap-8 md:grid-cols-2 mt-8">
      {/* 📈 Profit Growth Line Chart */}
      <div className="p-5 rounded-2xl shadow bg-white">
        <h3 className="font-semibold mb-3">Profit Growth (Last 6 Months)</h3>
        <Line data={profitGrowthData} />
      </div>

      {/* 📊 Investment vs Profit Bar Chart */}
      <div className="p-5 rounded-2xl shadow bg-white">
        <h3 className="font-semibold mb-3">Investment vs Profit</h3>
        <Bar data={investmentVsProfitData} />
      </div>

      {/* 🍩 Portfolio Allocation Doughnut Chart */}
      <div className="p-5 rounded-2xl shadow bg-white">
        <h3 className="font-semibold mb-3">Portfolio Allocation</h3>
        <div className="max-w-xs mx-auto">
          <Doughnut data={portfolioData} />
        </div>
      </div>

      {/* ⚡ Quick Actions */}
      <div className="p-5 rounded-2xl shadow bg-white">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="flex flex-col border rounded-lg hover:bg-gray-50 hover:cursor-pointer text-gray-800 bg-white justify-center items-center py-8 gap-2"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;
