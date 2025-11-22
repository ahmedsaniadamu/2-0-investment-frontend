'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import AdminPageLayout from "./_components/admin-page-layout"
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { CircleDollarSign, Users, ArrowUpRight, ArrowDownRight, MonitorCheck } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { plans } from '@/components/plans-section';
import SummaryCard from '../investor/_components/summary-card';
import FilterModal from './transactions/_components/filter-modal';
import { useQuery } from '@tanstack/react-query';
import { useSessionUserId } from '@/hooks/use-session-user-id';
import { adminDashboard } from '@/api/dashbard';
import { formatNumberWithCommas } from '@/lib/format-number';
import { DISTINCT_COLORS } from '@/lib/colors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const page = () => {

  const userId = useSessionUserId();
 
  const { data: summary, isPending } = useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: () => adminDashboard.getDashboardSummary(),
    select: (data: any) => data?.data,
  });

  const { data: roiPerPlan, isPending: roiPending } = useQuery({
    queryKey: ["roiPerPlan"],
    queryFn: () => adminDashboard.getROIPerPlan(),
    select: (data: any) => data?.data,
  });

   const { data: investmentDistribution, isPending: investmentPending } = useQuery({
    queryKey: ["Investment Distribution"],
    queryFn: () => adminDashboard.getInvestmentDistribution(),
    select: (data: any) => data?.data,
  });

  const barData = {
    labels: roiPerPlan?.length ? roiPerPlan?.map((p: any) => p?.planName) :  [],
    datasets: roiPerPlan?.length ? 
      [
        {
          label: '', //roiPerPlan?.length ? roiPerPlan?.map((p: any) => p?.planName) :  [],,
          data: roiPerPlan?.map((p: any) => Number(p.roi)),
          backgroundColor: DISTINCT_COLORS.slice(0, roiPerPlan?.length),
          borderRadius: 10,
      }]
    : [],
  };

  const doughnutData = {
    labels: investmentDistribution?.distribution?.length ? investmentDistribution?.distribution?.map((p: any) => `${p?.planName} ${formatNumberWithCommas(p?.amount)} (${p?.percentage}%)`) : [],
    datasets: [
      {
        data: investmentDistribution?.distribution?.length ? investmentDistribution?.distribution?.map((p: any) => Number(p?.percentage)) : [],
        backgroundColor: DISTINCT_COLORS.slice(0, investmentDistribution?.distribution?.length),
      },
    ],
  };

  return (
    <React.Fragment>
       <AdminPageLayout>
           <div className="p-3 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
       
        <SummaryCard
          title="Total Plans"
          isLoading={isPending}
          amount={summary?.totalPlans}
          Icon={<MonitorCheck className="w-6 h-6 text-[#005b9e]" />}
        />
        <SummaryCard
          title="Total Investors"
          amount={summary?.totalInvestors}
          isLoading={isPending}
          Icon={<Users className="w-6 h-6 text-green-600" />}
        />
        <SummaryCard
          title="Investments"
          isLoading={isPending}
          amount={'$' + formatNumberWithCommas(summary?.totalInvestments)}
          Icon={<CircleDollarSign className="w-6 h-6 text-blue-600" />}
        />
        <SummaryCard
          title="Total Deposits"
          amount={'$' + formatNumberWithCommas(summary?.totalDeposits)}
          isLoading={isPending}
          Icon={<ArrowUpRight className="w-6 h-6 text-emerald-600" />}
        />
        <SummaryCard
          title="Withdrawals"
          amount={ '$' + formatNumberWithCommas(summary?.totalWithdrawals)}
          isLoading={isPending}
          Icon={<ArrowDownRight className="w-6 h-6 text-red-600" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-semibold mb-4">ROI per Plan</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-semibold mb-4">Investment Distribution ({formatNumberWithCommas(investmentDistribution?.total)}) </h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
       </AdminPageLayout>
    </React.Fragment>
  )
}

export default page