'use client'
import React from 'react'
import AdminPageLayout from '../_components/admin-page-layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleUserRound, CheckCircle, Clock, XCircle, Search, Filter, DotSquare, EllipsisVertical } from "lucide-react";
import SummaryCard from '@/app/investor/_components/summary-card';
import { investors } from '../_components/dummy-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SearchInput from '@/components/search';
import { useSessionUserId } from '@/hooks/use-session-user-id';
import { useQuery } from '@tanstack/react-query';
import { adminInvestors } from '@/api/investors';
import Pagination from '@/components/pagination';
import Loader from '@/components/loader';
import EmptyData from '@/components/empty-data';
import { formatNumberWithCommas } from '@/lib/format-number';
import { useRouter } from 'next/navigation';

const page = () => {

   const [search, setSearch] = React.useState('')
   const [page, setPage] = React.useState(1)
   const [limit, setLimit] = React.useState(5)
   const userId = useSessionUserId();
   const {push} = useRouter();
    
     const { data: summary, isPending } = useQuery({
       queryKey: ["investorsSummary"],
       queryFn: () => adminInvestors.getInvestorsSummary(),
      // select: (data: any) => data?.data,
     });

     const { data: investors, isPending: investorsPending } = useQuery({
       queryKey: ["investors", userId, search, page, limit],
       queryFn: () => adminInvestors.getInvestors({
         search, page, limit, 
       }),
       enabled: !!userId,
       select: (data: any) => data,
     });
  //console.log({investors_});
  
  return (  
    <AdminPageLayout>
        <div className="p-3 space-y-6">
        <header className='md:flex justify-between items-center'>
          <h1 className="text-2xl max-[500px]:mb-3 font-semibold">My Investors</h1>
             <div>
                 <div className='flex items-center'>
                 <SearchInput 
                   setSearch={setSearch} placeHolder='Search Investor...'
                 />
                {/* <Button className='h-12 text-white bg-primary ml-2' variant="outline">
                   <Filter /> Filter
                </Button> */}
                 </div>
             </div>
        </header>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Investors"
          amount={summary?.totalInvestors}
          isLoading={isPending}
          Icon={<CircleUserRound className="w-6 h-6 text-primary" />}
        />
        <SummaryCard
          title="Verified"
          isLoading={isPending}
          amount={summary?.verified}
          Icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        />
        <SummaryCard
          title="Not Verified"
          isLoading={isPending}
          amount={summary?.unverified}
          Icon={<Clock className="w-6 h-6 text-yellow-600" />}
        />
      </div>

      {/* Investors Table */}
      <div className="bg-white overflow-x-auto p-3 rounded-2xl shadow-sm border">
        {
          investorsPending ? (
            <Loader size={8} color='text-primary'  />
          ):
          !investors?.data?.length ?
            <EmptyData text='No Investors Found' />
          :
          <section className='overflow-x-auto w-full p-1'>
             <Table className='overflow-x-auto w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Amount Invested</TableHead>
              <TableHead>Total Investment</TableHead>
              <TableHead>KYC Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              
            investors?.data?.map((investor: any, index: number) => (
                  <TableRow key={investor?.id}>
                <TableCell>{
                  index + 1 +
                 ( (investors?.pagination?.currentPage || 1) - 1) *
                  ( limit )
                  }</TableCell>
                <TableCell>{investor?.name}</TableCell>
                <TableCell>{investor?.email}</TableCell>
                <TableCell>{investor?.phone_number}</TableCell>
                <TableCell>${formatNumberWithCommas(investor?.totalInvestmentAmount)}</TableCell>
                <TableCell>{investor?.investmentCount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      investor?.kycRequests?.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : investor?.kycRequests?.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {investor?.kycRequests?.status || 'Not verified'}
                  </span>

                </TableCell>
                <TableCell>{investor?.isVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(investor?.createdAt).toLocaleDateString('en-ng')}</TableCell>
                <TableCell className="text-xs  text-center">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button className='bg-transparent hover:bg-transparent text-slate-800 p-0'>
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className='overflow-x-hidden'>
                    <DropdownMenuItem onClick={ () => {
                      push(`/admin/investors/${investor?.id}/transactions?name=${investor?.name}`)
                    } } className='overflow-x-hidden'>
                       View Transactions
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                   <DropdownMenuGroup className='overflow-x-hidden'>
                    <DropdownMenuItem onClick={ () => {
                       push(`/admin/investors/${investor?.id}/investments?name=${investor?.name}`)
                    } } className='overflow-x-hidden'>
                       View Investments
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                  <DropdownMenuGroup className='overflow-x-hidden'>
                    <DropdownMenuItem onClick={ () => {
                       push(`/admin/investors/${investor?.id}/profile?name=${investor?.name}`)
                    } } className='overflow-x-hidden'>
                       View Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </section>
          }
      </div>
      {investors?.pagination ?
        <Pagination
          pagination={investors?.pagination}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => setLimit(s)}
      /> : null}
    </div>
    </AdminPageLayout>
  )
}

export default page