'use client'
import React from 'react'
import InvestorPageLayout from '../_components/investor-page-layout'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownToLine, ArrowUpToLine, CircleArrowOutDownRight } from 'lucide-react'
import { CheckCircle, Clock, XCircle } from "lucide-react"
import SummaryCard from '../_components/summary-card'
import { useSessionUserId } from '@/hooks/use-session-user-id'
import { useQuery } from '@tanstack/react-query'
import { investorTransactions as investorTransactions_ } from '@/api/transaction'
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/pagination'
import Loader from '@/components/loader'
import EmptyData from '@/components/empty-data'
import { formatNumberWithCommas } from '@/lib/format-number'

const page = () => {

  const userId = useSessionUserId();
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(5)
  
  const { data: summary, isPending } = useQuery({
    queryKey: ["investortransactionSummary"],
    queryFn: () => investorTransactions_.getTransactionsSummary(userId as string),
    select: (data: any) => data,
    enabled: !!userId
  });

  const { data: investorTransactions, isPending: investorTransactionsPending } = useQuery({
         queryKey: ["investors transactions", , search, page, limit],
         queryFn: () => investorTransactions_.getTransactions({
           search, page, limit, id: userId as string,
         }),
         enabled: !!userId,
         select: (data: any) => data,
       });

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-700"
    case "pending":
      return "bg-yellow-100 text-yellow-700"
    case "rejected":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

  return (
    <InvestorPageLayout>
       <section className='md:p-3'>
            <header className='flex justify-between items-center'>
                <h1 className="text-2xl font-semibold flex justify-between items-center capitalize">
                    Transactions Overview
                </h1>
                <div>
                    <div className='flex items-center'>
                    <SearchInput  
                        setSearch={setSearch} placeHolder='Search Transactions...'
                    />
                    <Button onClick={ () => window.history.back() } className='h-12 text-white bg-primary ml-2' variant="outline">
                        Back
                    </Button> 
                    </div>
                </div>
            </header>
     <div className="grid grid-cols-1 mt-5 md:grid-cols-4 gap-4">
        <SummaryCard
            title="Total Transactions"
            amount={summary?.totalTransactions}
            isLoading={isPending}
            Icon={<CircleArrowOutDownRight className="w-6 h-6 text-primary" />}
        />
        <SummaryCard
            title="Approved"
            amount={summary?.approved}
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
      </div>
       <div className="bg-white mt-5 overflow-x-auto p-3 rounded-2xl shadow-sm border">
        {
          investorTransactionsPending ? (
            <Loader size={8} color='text-primary'  />
          ):
          !investorTransactions?.data?.length ?
            <EmptyData text='No Investments found' />
          :
           <section className='overflow-x-auto w-full p-1'>
               <Table className="overflow-x-auto w-full">
                <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Investment Goal</TableHead>
                    <TableHead>Amount ($)</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {investorTransactions?.data?.map((tx: any, index: number) => (
                    <TableRow key={tx?.id}>
                    <TableCell>{tx?.Plan?.name}</TableCell>
                    <TableCell className="font-medium capitalize flex gap-1 w-[150px] justify-between">{tx.type}
                        {tx?.type == 'deposit' ? <ArrowUpToLine className="ml-2 text-green-500" size={16} /> : <ArrowDownToLine className="ml-2 text-orange-500" size={16} /> }
                    </TableCell>
                    <TableCell>{tx.investmentGoal}</TableCell>
                    <TableCell className='font-bold text-primary'>${
                         formatNumberWithCommas(parseFloat(tx?.amount)) 
                        }</TableCell>
                    <TableCell>{tx.paymentMethod}</TableCell>
                    <TableCell>{
                        tx?.startDate ? new Date(tx?.createdAt).toLocaleDateString('en-ng') : 'N/A'    
                    }</TableCell>
                    <TableCell>
                        <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
             </Table>
            </section>
           }
          </div>
        </section>
      {
       investorTransactions?.pagination ?
        <Pagination
          pagination={investorTransactions?.pagination}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => setLimit(s)}
        /> : null 
      }

    </InvestorPageLayout>
  )
}

export default page