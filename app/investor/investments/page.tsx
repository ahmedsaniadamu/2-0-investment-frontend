'use client'
import React from 'react'
import InvestorPageLayout from '../_components/investor-page-layout'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSessionUserId } from '@/hooks/use-session-user-id'
import { investorInvestments } from '@/services/investment'
import { Button } from '@/components/ui/button'
import SummaryCard from '../_components/summary-card'
import { Activity, CheckCircle, CircleArrowOutDownRight, Clock, Eye, Wallet, XCircle } from 'lucide-react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Loader from '@/components/loader'
import EmptyData from '@/components/empty-data'
import { calculateInvestmentMetrics, getStatusConfig } from '@/app/admin/investors/[investor_id]/investments/page'
import { Progress } from '@/components/ui/progress'
import { formatNumberWithCommas } from '@/lib/format-number'
import Pagination from '@/components/pagination'
import { toastMessage } from '@/lib/custom-toast'
import { useConfirmModal } from '@/components/useConfirmationModal'
import { SpinnerCustom } from '@/components/ui/spinner'
import { investorTransactions } from '@/services/transaction'

const page = () => {

  const userId = useSessionUserId();
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(5)
  const { confirm, ConfirmModalElement } = useConfirmModal();
  const [activeInvestment, setActiveInvestment] = React.useState<any>(null);

  const { data: summary, isPending } = useQuery({
    queryKey: ["investorInvestmentSummary"],
    queryFn: () => investorInvestments.getInvestmentSummary(userId as string),
    select: (data: any) => data,
    enabled: !!userId
  });

  const { data: investments, isPending: investorInvestmentsPending } = useQuery({
    queryKey: ["investor investments", , search, page, limit],
    queryFn: () => investorInvestments.getInvestments({
      search, page, limit, id: userId as string,
    }),
    enabled: !!userId,
    select: (data: any) => data,
  });

  const { mutateAsync: initiateWithdrawal, isPending: initiateWithdrawalPending } = useMutation({
    mutationFn: investorInvestments.requestWithdrawal,
    mutationKey: ['initiate-withdrawal'],
  });

  const { mutateAsync: getLoginLink, isPending: getLoginLinkPending } = useMutation({
    mutationFn: investorTransactions.getLoginLink,
    mutationKey: ['get-login-link'],
  });

  const handleInitiateWithdrawal = async (investmentId: string) => {
    try {
      const res = await initiateWithdrawal(investmentId);
      toastMessage("success", "Success", res?.message || "Withdrawal request sent successfully");
    } catch (error: any) {
      toastMessage("error", "Error", error?.response?.data?.message || "Failed to send withdrawal request");
    }
  }

  const handleGetLoginLink = async (investmentId: string) => {
    try {
      const res = await getLoginLink({ investmentId, investorId: userId as string });
      toastMessage("success", "Success", res?.message || "Login link sent successfully");
      window.open(res?.url, "_blank");
    } catch (error: any) {
      toastMessage("error", "Error", error?.response?.data?.message || "Failed to send login link");
    }
  }

  const requestWithdrawal = async (investmentId: string) => {

    const ok = await confirm({
      title: `Confirm Withdrawal `,
      description: "Are you sure you want to request withdrawal for this investment?",
      confirmText: "Yes, Send Request",
    });
    if (ok) {
      return handleInitiateWithdrawal(investmentId);
    }
  }

  return (
    <InvestorPageLayout>
      {ConfirmModalElement}
      <header className='p-2 mt-3 mb-3 flex flex-col md:flex-row justify-between'>
        <h5 className='font-medium text-xl max-[500px]:mb-3'>Investments Overview</h5>
        <Button className='max-[500px]:w-full' asChild>
          <Link href={'/investor/available-plans'}>Explore Investments Plans</Link>
        </Button>
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
      <div className="bg-white mt-5 p-3 rounded-2xl shadow-sm border">
        {
          investorInvestmentsPending ? (
            <Loader size={8} color='text-primary' />
          ) :
            !investments?.data?.length ?
              <EmptyData text='No Investments found' />
              :
              <Table className='min-w-[1200px]'>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount ($)</TableHead>
                    <TableHead>ROI (%)</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Expected Withdrawal</TableHead>
                    <TableHead>Profit Progress</TableHead>
                    <TableHead>Current Profit ($)</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Onboarding Link</TableHead>
                    <TableHead>Login Link</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    investments?.data?.map((investment: any, index: number) => {
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
                          <TableCell className="font-bold text-primary">${formatNumberWithCommas(amount)}</TableCell>
                          <TableCell className='font-bold'>{averageRoi()}%</TableCell>
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
                              className={`h-2 ${metrics.profitProgress < 30
                                ? "bg-blue-100 [&>div]:bg-blue-500"
                                : metrics.profitProgress < 60
                                  ? "bg-orange-100 [&>div]:bg-orange-500"
                                  : "bg-green-100 [&>div]:bg-green-600"
                                }`}
                            />
                            <p className="text-xs text-gray-500 mt-1">{metrics.profitProgress}% of yearly profit</p>
                          </TableCell>
                          <TableCell className="font-bold text-green-900">${metrics.currentProfit.toLocaleString()}</TableCell>
                          <TableCell className="capitalize">{investment?.paymentStatus || 'N/A'}</TableCell>
                          <TableCell className='pl-8'>
                            {investment?.onboardingLink ? (
                              <a
                                href={investment.onboardingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                              >
                                <Eye />
                              </a>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className='pl-5'>
                            {
                              statusConfig.label === "Completed" && investment?.onboardingLink
                                ? (
                                  <button
                                    onClick={() => handleGetLoginLink(investment?.id)}
                                    className="text-primary hover:underline font-medium"
                                  >
                                    {getLoginLinkPending ? <SpinnerCustom /> : <Eye />}
                                  </button>
                                ) : (
                                  <span className="text-gray-400">N/A</span>
                                )}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
                              {statusConfig.icon}
                              {statusConfig.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                setActiveInvestment(investment);
                                requestWithdrawal(investment?.id)
                              }}
                              variant={statusConfig.label === "Completed" && !investment?.isWithdrawalSent ? "default" : "outline"}
                              disabled={statusConfig.label !== "Completed" || investment?.isWithdrawalSent}
                            >
                              {
                                activeInvestment?.id === investment?.id && initiateWithdrawalPending ?
                                  <SpinnerCustom />
                                  :
                                  investment?.isWithdrawalSent ? 'Request Sent' : 'Withdraw'
                              }
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
        }
      </div>
      {investments?.pagination ?
        <Pagination
          pagination={investments?.pagination}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => setLimit(s)}
        /> : null}
    </InvestorPageLayout>
  )
}

export default page