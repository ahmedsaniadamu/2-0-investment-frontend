'use client'
import SummaryCard from '@/app/investor/_components/summary-card'
import AdminPageLayout from '../_components/admin-page-layout'
import {
  Card, CardDescription, CardHeader
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CheckCircle, CircleDollarSign, Clock, Filter, HandCoins, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Deposits from './_components/deposits'
import Withdrawal from './_components/withdrawal'
import FilterModal from './_components/filter-modal'
import { useState } from 'react'
import { useSessionUserId } from '@/hooks/use-session-user-id'
import { useRouter } from 'next/navigation'
import SearchInput from '@/components/search'
import { useQuery } from '@tanstack/react-query'
import { adminTransactions } from '@/services/transaction'
import Pagination from '@/components/pagination'
import Loader from '@/components/loader'
import { usePermission } from '@/hooks/use-permission'
import AccessDeniedFullScreen from '../_components/access-denied'

export type filterType = {
  status: string;
  paymentMethod: string;
  startDateFrom: string;
  startDateTo: string;
  createdFrom: string;
  createdTo: string;
  transactionId: string;
}
const page = () => {

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const userId = useSessionUserId();
  const { push } = useRouter();
  const { hasAccess, loading } = usePermission("transactions", "view_transactions");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
  const [filters, setFilters] = useState<filterType>({
    status: '',
    paymentMethod: '',
    startDateFrom: '',
    startDateTo: '',
    createdFrom: '',
    createdTo: '',
    transactionId: ''
  });

  const { data: summary, isPending, refetch: refetchSummary } = useQuery({
    queryKey: ["transactionSummary"],
    queryFn: () => adminTransactions.getTransactionsSummary(),
  });

  const { data: transactions, isPending: transactionsPending, refetch } = useQuery({
    queryKey: ["transactions", userId, search, page, limit, type,
      filters.status, filters.paymentMethod, filters.startDateFrom,
      filters.startDateTo, filters.createdFrom, filters.createdTo,
    ],
    queryFn: () => adminTransactions.getTransactions({
      search, page, limit, type, status: filters.status,
      paymentMethod: filters.paymentMethod,
      startDateFrom: filters.startDateFrom,
      startDateTo: filters.startDateTo,
      createdFrom: filters.createdFrom,
      createdTo: filters.createdTo,
      transactionId: filters.transactionId
    }),
    //  enabled: !!userId,
    select: (data: any) => data,
  });

  if (loading) return (
    <Loader />
  )

  if (!hasAccess) return (
    <AccessDeniedFullScreen />
  )

  return (
    <AdminPageLayout>
      <FilterModal
        filters={filters} setFilters={setFilters}
        open={openFilterModal} setOpen={setOpenFilterModal}
      //onApply={handleApplyFilter}
      />
      <div className="p-1 space-y-6">
        <header className='md:flex justify-between items-center'>
          <h1 className="text-2xl font-semibold max-[500px]:mb-3">Transactions Overview</h1>
          <div>
            <div className='md:flex items-center'>
              <SearchInput
                setSearch={setSearch} placeHolder='Search transactions...'
              />
              <Button onClick={() => setOpenFilterModal(true)} className='h-12 max-[500px]:w-full max-[500px]:mt-3 text-white bg-primary ml-2' variant="outline">
                <Filter /> Filter
              </Button>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Total Transactions"
            amount={summary?.totalTransactions}
            Icon={<CircleDollarSign className="w-6 h-6 text-blue-600" />}
            isLoading={isPending}
          />
          <SummaryCard
            title="Approved"
            amount={summary?.approved}
            Icon={<CheckCircle className="w-6 text-green-600 h-6" />}
            isLoading={isPending}
          />
          <SummaryCard
            title="Pending"
            amount={summary?.pending}
            Icon={<Clock className="w-6 text-yellow-600 h-6" />}
            isLoading={isPending}
          />
          <SummaryCard
            title="Rejected"
            amount={summary?.rejected}
            Icon={<XCircle className="w-6 text-red-600 h-6" />}
            isLoading={isPending}
          />
          <SummaryCard
            title="Withdrawal Requests"
            amount={summary?.withdrawalRequest}
            Icon={<HandCoins className="w-6 text-orange-500 h-6" />}
            isLoading={isPending}
          />
        </div>
        <div className="w-full">
          <Tabs defaultValue="Deposit" className='w-full'>
            <TabsList>
              <TabsTrigger onClick={() => {
                setPage(1)
                setType('deposit')
              }} className='max-[500px]:w-[200px] md:w-[500px]' value="Deposit">
                Deposit
              </TabsTrigger>
              <TabsTrigger onClick={() => {
                setPage(1)
                setType('withdraw')
              }} className='max-[500px]:w-[200px] md:w-[500px]' value="Withdrawal">
                Withdrawal
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Deposit" className='w-full block'>
              <Card className='w-full m-0 shadow-none border-none'>
                <CardHeader className='w-full'>
                  <CardDescription className='w-full bg-white overflow-x-auto'>
                    {transactionsPending ? <Loader size={8} color='text-primary' /> :
                      <Deposits refetch={refetch} refetchSummary={refetchSummary} limit={limit} transactions={transactions} />
                    }
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="Withdrawal">
              <Card className='w-full m-0 shadow-none border-none'>
                <CardHeader>
                  <CardDescription className='w-full bg-white overflow-x-auto'>
                    {transactionsPending ? <Loader size={8} color='text-primary' /> :
                      <Withdrawal
                        limit={limit} transactions={transactions}
                        refetch={refetch}
                        refetchSummary={refetchSummary}
                      />
                    }
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {
          transactions?.pagination ?
            <Pagination
              pagination={transactions?.pagination}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => setLimit(s)}
            /> : null
        }
      </div>
    </AdminPageLayout>
  )
}

export default page