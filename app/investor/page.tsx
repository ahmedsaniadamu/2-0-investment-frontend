'use client'
import React from "react";
import InvestorPageLayout from "./_components/investor-page-layout";
import SummaryCard from "./_components/summary-card";
import {
  CircleDollarSign,
  TrendingUp,
  Layers,
  Wallet,
} from "lucide-react";
import ChartsSection from "./_components/charts-section";
import { useSessionUserId } from "@/hooks/use-session-user-id";
import { useQuery } from "@tanstack/react-query";
import { investorDashboard } from "@/api/dashbard";
import { formatNumberWithCommas } from "@/lib/format-number";

const Page = () => {

  const userId = useSessionUserId();
   
    const { data: summary, isPending } = useQuery({
      queryKey: ["ivestorDashboardSummary"],
      queryFn: () => investorDashboard.getDashboardSummary(userId as string),
      select: (data: any) => data?.data,
      enabled: !!userId
    });

  return (
    <InvestorPageLayout> 
      <header className="grid mt-2 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <SummaryCard
          title="Total Investment"
          amount={`$${formatNumberWithCommas(summary?.totalInvestment || 0)}`}
          Icon={<CircleDollarSign className="w-6 h-6 text-[#005b9e]" />}
          isLoading={isPending}
        />
        <SummaryCard
          title="Total Profit"
          amount={`$${formatNumberWithCommas(summary?.totalProfit || 0)}`}
          Icon={<TrendingUp className="w-6 h-6 text-green-500" />}
          isLoading={isPending}
        />

        {/* 📊 Active Plans */}
        <SummaryCard
          title="Active Plans"
          amount={summary?.activePlans || 0}
          Icon={<Layers className="w-6 h-6 text-purple-500" />}
          isLoading={isPending}
        />

        {/* 💼 Available Balance */}
        <SummaryCard
          title="Total Transactions"
          amount={summary?.totalTransactions || 0}
          Icon={<Wallet className="w-6 h-6 text-amber-500" />}
          isLoading={isPending}
        />
      </header>
      <section>
         <ChartsSection />
      </section>
    </InvestorPageLayout>
  );
};

export default Page;
