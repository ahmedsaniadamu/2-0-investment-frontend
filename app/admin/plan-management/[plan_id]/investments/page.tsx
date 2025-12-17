'use client'
export const dynamic = "force-static"
import { adminPlans } from '@/api/plan'
import AdminPageLayout from '@/app/admin/_components/admin-page-layout'
import Pagination from '@/components/pagination'
import SearchInput from '@/components/search'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState } from 'react'
import Loader from '@/components/loader'
import EmptyData from '@/components/empty-data'
import { formatNumberWithCommas } from '@/lib/format-number'
import { getStatusConfig } from '@/app/admin/investors/[investor_id]/investments/page'
const page = () => {

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const searchParams = useSearchParams();
  const {plan_id} = useParams();

  const { data:  investments, isPending, refetch } = useQuery({
       queryKey: ["get plans", search, page, limit],
       queryFn: () => adminPlans.getPlansInvestments({
         id: plan_id as string, search, page, limit
        }),
      });

  return (
    <AdminPageLayout>
         <div className="p-3 space-y-6">
        <header className='md:flex justify-between items-center'>
          <h1 className="max-[500px]:mb-3 text-2xl font-semibold">
               ({searchParams.get('plan_name')})  Investments
             </h1>
             <div>
                 <div className='md:flex items-center'>
                    <SearchInput 
                      setSearch={setSearch} placeHolder='Search Investments...'
                    />
                 </div>
             </div>
        </header>
         <div className="bg-white mt-5 overflow-x-auto p-3 rounded-2xl shadow-sm border">
        {
          isPending ? (
            <Loader size={8} color='text-primary'  />
          ):
          !investments?.data?.length ?
            <EmptyData text='No Investments found' />
          :
          <section className='overflow-x-auto w-full p-1'>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Investment Goal</TableHead>
                    <TableHead>Amount ($)</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>invested At</TableHead> 
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Action</TableHead> */}
                </TableRow>
                </TableHeader>
                <TableBody>
                {
                  investments?.data?.map((investment: any, index: number) => {
                   const statusConfig = getStatusConfig(investment?.status);
                    return (
                                     <TableRow key={investment?.id}>
                                       <TableCell>{investment?.investmentGoal}</TableCell>
                                       <TableCell className="font-bold">${formatNumberWithCommas(investment?.amount)}</TableCell>
                                       <TableCell>{investment?.paymentMethod}</TableCell>
                                       <TableCell>{investment?.startDate
                                        ? new Date(investment.startDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                        }) : 'N/A'
                                        }</TableCell>
                                       <TableCell>
                                         {investment?.createdAt
                                        ? new Date(investment.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                        }) : 'N/A'
                                        }
                                       </TableCell>                                        
                                       <TableCell>
                                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
                                            {statusConfig.icon}
                                            {statusConfig.label}
                                        </span>
                                       </TableCell>
                                        
                                     </TableRow>
                                   )
                                })}
                                </TableBody>
                     </Table>
            </section>
           }
        </div>
        {investments?.pagination ?
            <Pagination
                pagination={investments?.pagination}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(s) => setLimit(s)}
            /> : null
        }
        </div>
    </AdminPageLayout>
  )
}

export default page