'use client'
import React, { useState } from 'react'
import AdminPageLayout from '../_components/admin-page-layout'
import { adminInvestments } from '@/services/investment'
import { useQuery } from '@tanstack/react-query'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import SummaryCard from '@/app/investor/_components/summary-card'
import { Activity, CheckCircle, CircleArrowOutDownRight, Clock, Wallet, XCircle } from 'lucide-react'
import Loader from '@/components/loader'
import EmptyData from '@/components/empty-data'
import { Progress } from '@/components/ui/progress'
import { formatNumberWithCommas } from '@/lib/format-number'
import { calculateInvestmentMetrics, getStatusConfig } from '../investors/[investor_id]/investments/page'
import Pagination from '@/components/pagination'
import { usePermission } from '@/hooks/use-permission'
import AccessDeniedFullScreen from '../_components/access-denied'

const page = () => {

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const { hasAccess, loading } = usePermission("investments", 'view_investments');

    const { data: summary, isPending, refetch: refetchSummary } = useQuery({
        queryKey: ["investmentSummary"],
        queryFn: () => adminInvestments.getInvestmentSummary(),
    });

    const { data: investments, isPending: investmentsPending, refetch: refetchInvestments } = useQuery({
        queryKey: ["get investments", search, page, limit],
        queryFn: () => adminInvestments.getInvestments({ search, page, limit }),
    });

    if (loading) return (
        <Loader />
    )

    if (!hasAccess) return (
        <AccessDeniedFullScreen />
    )

    return (
        <AdminPageLayout>
            <section className='p-3'>
                <header className='md:flex justify-between items-center'>
                    <h1 className="text-2xl max-[500px]:mb-3 font-semibold flex justify-between items-center capitalize">
                        Investments Overview
                    </h1>
                    <div>
                        <div className='flex max-[500px]:flex-col max-[500px]:gap-3 items-center'>
                            <SearchInput
                                setSearch={setSearch} placeHolder='Search Investments...'
                            />
                            <Button onClick={() => window.history.back()} className='h-12 text-white bg-primary ml-2' variant="outline">
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
                <div className="bg-white mt-5 p-3 rounded-2xl shadow-sm border">
                    {
                        investmentsPending ? (
                            <Loader size={8} color='text-primary' />
                        ) :
                            !investments?.data?.length ?
                                <EmptyData text='No Investments found' />
                                :
                                <Table className='min-w-[1200px]'>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            {/* <TableHead>Phone Number</TableHead> */}
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

                                                        <TableCell>{investment?.investor?.name}</TableCell>
                                                        <TableCell>{investment?.investor?.email}</TableCell>
                                                        {/* <TableCell>{investment?.investor?.phone_number}</TableCell> */}
                                                        <TableCell>{investment?.plan?.name}</TableCell>
                                                        <TableCell className="font-bold text-primary">${formatNumberWithCommas(amount)}</TableCell>
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
                    }
                </div>
                {investments?.pagination ?
                    <Pagination
                        pagination={investments?.pagination}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(s) => setLimit(s)}
                    /> : null}
            </section>
        </AdminPageLayout>
    )
}

export default page