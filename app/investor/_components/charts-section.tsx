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
import { useSessionUserId } from "@/hooks/use-session-user-id";
import { useQuery } from "@tanstack/react-query";
import { investorDashboard } from "@/api/dashbard";
import { DISTINCT_COLORS } from "@/lib/colors";

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
 const userId = useSessionUserId();
   
    const { data: monthlyProfitGrowth, isPending: profitGrowthPending } = useQuery({
      queryKey: ["investorMonthlyProfitGrowth"],
      queryFn: () => investorDashboard.getMonthlyProfitGrowth(userId as string),
      select: (data: any) => data?.data,
      enabled: !!userId
    });

    const { data: investmentVsProfit, isPending: investmentVsProfitPending }:
    {
      isPending: boolean;
      data: any
    } = useQuery({
      queryKey: ["investorInvestmentVsProfit"],
      queryFn: () => investorDashboard.getInvestmentVsProfit(userId as string),
      select: (data: any) => data?.data,
      enabled: !!userId
    });

    const { data: portfolioAllocation, isPending: portfolioAllocationPending } = useQuery({
      queryKey: ["investorPortfolioAllocation"],
      queryFn: () => investorDashboard.getPortfolioAllocation(userId as string),
      select: (data: any) => data?.data,
      enabled: !!userId
    });

    console.log({monthlyProfitGrowth, investmentVsProfit, portfolioAllocation});
    
  
  const profitGrowthData = {
    labels: monthlyProfitGrowth?.length ? monthlyProfitGrowth?.map((p: any) => p?.month) : [],
    datasets: [
      {
        label: "Profit ($)",
        data: monthlyProfitGrowth?.length ? monthlyProfitGrowth?.map((p: any) => parseFloat(p?.profit)) : [],
        borderColor: "#10b981",
        backgroundColor: "rgba(22,163,74,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const investmentVsProfitData = {
    labels: investmentVsProfit?.length && !investmentVsProfitPending ? investmentVsProfit?.map((p: any) => p?.planName) : [],
    datasets: [
      {
        label: "Total Investment ($)",
        data: investmentVsProfit?.length && !investmentVsProfitPending ? investmentVsProfit?.map((p: any) => parseFloat(p?.totalInvestment)) : [],
        backgroundColor: "#005b9e",
        borderRadius: 6,
      },
      {
        label: "Total Profit ($)",
        data:  investmentVsProfit?.length && !investmentVsProfitPending ? investmentVsProfit?.map((p: any) => parseFloat(p?.totalProfit)) : [],
        backgroundColor: "#10b981",
        borderRadius: 6,
      },
    ],
  };

  const portfolioData = {
    labels: portfolioAllocation?.length ? portfolioAllocation?.map((p: any) => p?.planName) : [],
    datasets: [
      {
        data: portfolioAllocation?.length ? portfolioAllocation?.map((p: any) => parseFloat(p?.percentage)) : [],
        backgroundColor: DISTINCT_COLORS.slice(0, portfolioAllocation?.length),
        borderColor: "#fff",
        borderWidth: 2,
        cutout: "60%", // makes it a doughnut
      },
    ],
  };

  const quickActions = [
    {
      label: "View Investments",
      icon: <CircleDollarSign className="text-[#005b9e] w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/investments"),
    },
    {
      label: "Plans",
      icon: <Calendar className="text-green-500 w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/available-plans"),
    },
    {
      label: "Transactions",
      icon: <ScanLine className="text-orange-500 w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/transactions"),
    },
    {
      label: "Profile Settings",
      icon: <Settings className="text-gray-600 w-10 h-10 text-2xl" />,
      action: () => router.push("/investor/settings"),
    },
  ];

  return (
    <section className="grid gap-8 md:grid-cols-2 mt-8">
      <div className="p-5 rounded-2xl shadow bg-white">
        <h3 className="font-semibold mb-3">Profit Growth (Last 6 Months)</h3>
        <Line data={profitGrowthData} />
      </div>
      <div className="p-5 rounded-2xl shadow bg-white">
        <h3 className="font-semibold mb-3">Investment vs Profit</h3>
        <Bar data={investmentVsProfitData} />
      </div>
      <div className="p-5 rounded-2xl shadow bg-white">
        <h3 className="font-semibold mb-3">Portfolio Allocation</h3>
        <div className="max-w-xs mx-auto">
          <Doughnut data={portfolioData} />
        </div>
      </div>
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
