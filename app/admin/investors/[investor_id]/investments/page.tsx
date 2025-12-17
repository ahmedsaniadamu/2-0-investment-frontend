'use client'
export const dynamic = "force-static"
import { adminInvestors } from '@/services/investors'
import AdminPageLayout from '@/app/admin/_components/admin-page-layout'
import SummaryCard from '@/app/investor/_components/summary-card'
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Activity, CheckCircle, CircleArrowOutDownRight, CircleUserRound, Clock, Wallet, XCircle } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import EmptyData from '@/components/empty-data'
import Loader from '@/components/loader'
import Pagination from '@/components/pagination'
import { formatNumberWithCommas } from '@/lib/format-number'
import { usePermission } from '@/hooks/use-permission'
import AccessDeniedFullScreen from '@/app/admin/_components/access-denied'

export const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-blue-100 text-blue-700',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'active':
        return {
          label: 'Active',
          className: 'bg-green-100 text-green-500',
          icon: <Activity className="w-4 h-4" />
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-yellow-100 text-yellow-700',
          icon: <Clock className="w-4 h-4" />
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-100 text-red-700',
          icon: <XCircle className="w-4 h-4" />
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-700',
          icon: null
        };
    }
  };

   export const calculateInvestmentMetrics = (investment: any) => {
    const amount = parseFloat(investment.amount);
    const averageRoi = () => {
        const [min, max] = investment?.plan?.roi?.replace("%", "").split("-").map(Number);
        const avgRoi = (min + max) / 2;
        return avgRoi.toFixed(2);
    }
    const roi = parseFloat(averageRoi());
    const startDate: any = new Date(investment.startDate);
    const currentDate: any = new Date();
    
    // Calculate end date (1 year from start)
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
    
    // Calculate days elapsed and total days
    const totalDays = 365;
    const daysElapsed = Math.max(0, Math.min(
      Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)),
      totalDays 
    ));
    
    // Calculate profit progress percentage
    const profitProgress = investment.status === 'completed' 
      ? 100 
      : investment.status === 'pending' || investment.status === 'rejected'
      ? 0
      : Math.min(Math.round((daysElapsed / totalDays) * 100), 100);
    
    // Calculate total expected profit
    const totalExpectedProfit = (amount * roi) / 100;
    
    // Calculate current profit based on progress
    const currentProfit = investment.status === 'completed'
      ? totalExpectedProfit
      : investment.status === 'pending' || investment.status === 'rejected'
      ? 0
      : (totalExpectedProfit * profitProgress) / 100;
    
    // Format expected withdrawal date
   const expectedWithdrawalDate = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return {
      profitProgress,
      currentProfit: currentProfit.toFixed(2),
      expectedWithdrawalDate,
      totalExpectedProfit: totalExpectedProfit.toFixed(2)
    };
  };

  export const getProgressBarColor = (progress: number) => {
    if (progress < 30) return 'bg-blue-500';
    if (progress < 60) return 'bg-orange-500';
    return 'bg-green-600';
  };

const page = () => {

       const [search, setSearch] = React.useState('')
       const [page, setPage] = React.useState(1)
       const [limit, setLimit] = React.useState(5)
       const {investor_id}: {investor_id: string} = useParams()
       const searchParams = useSearchParams();
       const { hasAccess, loading } = usePermission("investors", 'view_investors_investments');
     //  const userId = useSessionUserId();
     const { data: summary, isPending } = useQuery({
       queryKey: ["investorsinvestmentSummary"],
       queryFn: () => adminInvestors.getInvestorInvestmentsSummary({
         id: investor_id
       }),
       enabled: !!investor_id,
      // select: (data: any) => data?.data,
     });

     const { data: investorInvestments, isPending: investorInvestmentsPending } = useQuery({
       queryKey: ["investors investments", , search, page, limit],
       queryFn: () => adminInvestors.getInvestorInvestments({
         search, page, limit, id: investor_id,
       }),
       enabled: !!investor_id,
       select: (data: any) => data,
     });

  if(loading) return (
      <Loader />
    )
    
    if(!hasAccess) return (
      <AccessDeniedFullScreen />
    )

  return (
    <AdminPageLayout>
        <section className='md:p-3'>
            <header className='md:flex justify-between items-center'>
          <h1 className="text-2xl max-[500px]:mb-3 font-semibold flex justify-between items-center capitalize">
                    {searchParams.get('name')}'s  Investments
                </h1>
                <div>
                    <div className='md:flex items-center'>
                    <SearchInput 
                        setSearch={setSearch} placeHolder='Search Investments...'
                    />
              <Button onClick={() => window.history.back()} className='h-12 max-[500px]:w-full max-[500px]:mt-3 text-white bg-primary ml-2' variant="outline">
                        Back
                    </Button> 
                    </div>
                </div>
            </header>
          <div className="grid grid-cols-1 mt-3 md:grid-cols-3 gap-4">
        <SummaryCard
            title="Total Investment"
            amount={summary?.count}
            isLoading={isPending}
            Icon={<CircleArrowOutDownRight className="w-6 h-6 text-primary" />}
        />
        <SummaryCard
            title="Completed"
            amount={summary?.completed}
            isLoading={isPending}
            Icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        />
        <SummaryCard
            title="Pending"
            amount={summary?.pending}
            isLoading={isPending}
            Icon={<Clock className="w-6 h-6 text-yellow-600" />}
        />
        <SummaryCard
            title="Rejected"
            amount={summary?.rejected}
            isLoading={isPending}
            Icon={<XCircle className="w-6 h-6 text-red-600" />}
        />
        <SummaryCard
            title="Active (In progress)"
            amount={summary?.active}
            isLoading={isPending}
            Icon={<Activity className="w-6 h-6 text-blue-600" />}
        />

        {/* Total Investment Amount */}
        <SummaryCard
            title="Total Investments Amount"
            amount={`$${summary?.amount ? summary?.amount?.toLocaleString() : 0}`}
            isLoading={isPending}
            Icon={<Wallet className="w-6 h-6 text-indigo-600" />}
        />
          </div>
          <div className="bg-white mt-5 overflow-x-auto p-3 rounded-2xl shadow-sm border">
        {
          investorInvestmentsPending ? (
            <Loader size={8} color='text-primary'  />
          ):
          !investorInvestments?.data?.length ?
            <EmptyData text='No Investments found' />
          :
          <section className='overflow-x-auto w-full p-1'>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount ($)</TableHead>
                    <TableHead>ROI (%)</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Expected Withdrawal</TableHead>
                    <TableHead>Profit Progress</TableHead>
                    <TableHead>Current Profit ($)</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Action</TableHead> */}
                </TableRow>
                </TableHeader>
                <TableBody>
                {
                  investorInvestments?.data?.map((investment: any, index: number) => {
                    const metrics = calculateInvestmentMetrics(investment);
                    const statusConfig = getStatusConfig(investment.status);
                    const amount = parseFloat(investment?.amount);
                    const averageRoi = () => {
                        const [min, max] = investment?.plan?.roi?.replace("%", "").split("-").map(Number);
                        const avgRoi = (min + max) / 2;
                        return avgRoi.toFixed(2);
                    }

                    return (
                                     <TableRow key={investment?.id}>
                                       <TableCell>{investment?.plan?.name}</TableCell>
                                       <TableCell className="font-bold">${formatNumberWithCommas(amount)}</TableCell>
                                       <TableCell>{averageRoi()}%</TableCell>
                                       <TableCell>{investment?.startDate
                                        ? new Date(investment.startDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                        }) : 'N/A'
                                        }</TableCell>
                                       <TableCell>{metrics.expectedWithdrawalDate}</TableCell>
                                       <TableCell className="w-[200px]">
                                          <Progress
                                           value={metrics.profitProgress}
                                           className={`h-2 ${
                                             metrics.profitProgress < 30
                                               ? "bg-blue-100 [&>div]:bg-blue-500"
                                               : metrics.profitProgress < 60
                                               ? "bg-orange-100 [&>div]:bg-orange-500"
                                               : "bg-green-100 [&>div]:bg-green-600"
                                           }`}
                                         />
                                         <p className="text-xs text-gray-500 mt-1">{metrics.profitProgress}% of yearly profit</p>
                                       </TableCell>
                                       <TableCell className="font-bold text-green-900">${metrics.currentProfit.toLocaleString()}</TableCell>
                                       <TableCell>
                                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
                                            {statusConfig.icon}
                                            {statusConfig.label}
                                        </span>
                                       </TableCell>
                                       {/* {<TableCell>
                                         <Button
                                           variant={ investment?.status === "Completed" ? "default" : "outline"}
                                           disabled={investment?.status !== "Completed"}
                                         >
                                           Withdraw
                                         </Button>
                                       </TableCell>} */}
                                     </TableRow>
                                   )
                                })}
                                </TableBody>
                     </Table>
            </section>
           }
          </div>
        </section>
        {investorInvestments?.pagination ?
        <Pagination
          pagination={investorInvestments?.pagination}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => setLimit(s)}
      /> : null}
    </AdminPageLayout>
  )
}

export default page