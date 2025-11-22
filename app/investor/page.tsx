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

const Page = () => {
  return (
    <InvestorPageLayout>
      <header className="grid mt-2 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* 💰 Total Investment */}
        <SummaryCard
          title="Total Investment"
          amount="$15,200"
          Icon={<CircleDollarSign className="w-6 h-6 text-[#005b9e]" />}
          isLoading={false}
        />

        {/* 📈 Total Profit */}
        <SummaryCard
          title="Total Profit"
          amount="$1,540"
          Icon={<TrendingUp className="w-6 h-6 text-green-500" />}
          isLoading={false}
        />

        {/* 📊 Active Plans */}
        <SummaryCard
          title="Active Plans"
          amount="3"
          Icon={<Layers className="w-6 h-6 text-purple-500" />}
          isLoading={false}
        />

        {/* 💼 Available Balance */}
        <SummaryCard
          title="Total Transactions"
          amount="$420"
          Icon={<Wallet className="w-6 h-6 text-amber-500" />}
          isLoading={false}
        />
      </header>
      <section>
         <ChartsSection />
      </section>
    </InvestorPageLayout>
  );
};

export default Page;
