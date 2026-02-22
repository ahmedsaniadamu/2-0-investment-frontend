'use client'
export const dynamic = "force-static"
import { adminInvestors } from '@/services/investors'
import AdminPageLayout from '@/app/admin/_components/admin-page-layout'
import SummaryCard from '@/app/investor/_components/summary-card'
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Activity, ArrowDownToLine, ArrowUpToLine, CheckCircle, CircleArrowOutDownRight, CircleUserRound, Clock, Wallet, XCircle } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { usePermission } from '@/hooks/use-permission'
import AccessDeniedFullScreen from '@/app/admin/_components/access-denied'
import ViewMore from '@/app/investor/transactions/_components/view-more'

const page = () => {

  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(5)
  const { investor_id }: { investor_id: string } = useParams()
  const searchParams = useSearchParams();
  const { hasAccess, loading } = usePermission("investors", 'view_investors_transactions');
  const { data: summary, isPending } = useQuery({
    queryKey: ["investorstransactionSummary"],
    queryFn: () => adminInvestors.getInvestorTransactionsSummary({
      id: investor_id
    }),
    enabled: !!investor_id,
    // select: (data: any) => data?.data,
  });

  const { data: investorTransactions, isPending: investorTransactionsPending } = useQuery({
    queryKey: ["investors transactions", , search, page, limit, investor_id],
    queryFn: () => adminInvestors.getInvestorTransactions({
      search, page, limit, id: investor_id,
    }),
    enabled: !!investor_id,
    select: (data: any) => data,
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "success":
      case "successful":
      case "succeeded":
        return "bg-green-100 text-green-700"
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700"
      case "rejected":
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (loading) return (
    <Loader />
  )

  if (!hasAccess) return (
    <AccessDeniedFullScreen />
  )

  return (
    <AdminPageLayout>
      <section className='md:p-3'>
        <header className='md:flex justify-between items-center'>
          <h1 className="text-2xl max-[500px]:mb-3 font-semibold flex justify-between items-center capitalize">
            {searchParams.get('name')}'s  Transactions
          </h1>
          <div>
            <div className='md:flex items-center'>
              <SearchInput
                setSearch={setSearch} placeHolder='Search Transactions...'
              />
              <Button onClick={() => window.history.back()} className='h-12 max-[500px]:w-full max-[500px]:mt-3 text-white bg-primary ml-2' variant="outline">
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
        <div className="bg-white mt-5 p-3 rounded-2xl shadow-sm border">
          {
            investorTransactionsPending ? (
              <Loader size={8} color='text-primary' />
            ) :
              !investorTransactions?.data?.length ?
                <EmptyData text='No Investments found' />
                :
                <Table className="min-w-[1000px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Transaction Status</TableHead>
                      <TableHead>Amount ($)</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Approval Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investorTransactions?.data?.map((tx: any, index: number) => (
                      <TableRow key={tx?.id}>
                        <TableCell>{tx?.Plan?.name}</TableCell>
                        <TableCell className="font-medium capitalize flex gap-1 w-[150px] justify-between">{tx.type}
                          {tx?.type == 'deposit' ? <ArrowUpToLine className="ml-2 text-green-500" size={16} /> : <ArrowDownToLine className="ml-2 text-orange-500" size={16} />}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(tx.transactionStatus)}>{tx.transactionStatus || 'N/A'}</Badge>
                        </TableCell>
                        <TableCell className='font-bold text-primary'>${
                          formatNumberWithCommas(parseFloat(tx?.amount))
                        }</TableCell>
                        <TableCell>{tx.paymentMethod}</TableCell>
                        <TableCell>{
                          tx?.createdAt ? new Date(tx?.createdAt).toLocaleDateString('en-ng') : 'N/A'
                        }</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <ViewMore transaction={tx} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
          }
        </div>
      </section>
      {investorTransactions?.pagination ?
        <Pagination
          pagination={investorTransactions?.pagination}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => setLimit(s)}
        /> : null
      }
    </AdminPageLayout>
  )
}

export default page