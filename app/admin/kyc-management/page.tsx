'use client'
import React from 'react'
import AdminPageLayout from '../_components/admin-page-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle, CircleDollarSign, Clock, FileUser, Filter, HandCoins, MapPinned, Search, XCircle } from 'lucide-react'
import SummaryCard from '@/app/investor/_components/summary-card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { kycSubmissions } from '../_components/dummy-data' 
import { useState } from "react";
import Link from 'next/link'
import { useConfirmModal } from '@/components/useConfirmationModal';
import { useQuery } from '@tanstack/react-query'
import { adminKyc } from '@/services/kyc'
import SearchInput from '@/components/search'
import Loader from '@/components/loader'
import EmptyData from '@/components/empty-data'
import Pagination from '@/components/pagination'
import { useRouter } from 'next/navigation'
import AccessDeniedFullScreen from '../_components/access-denied'
import { usePermission } from '@/hooks/use-permission'

const page = () => {

    const {confirm, ConfirmModalElement} = useConfirmModal();
     const [search, setSearch] = React.useState('')
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(5)
    const router = useRouter()
    const { hasAccess, loading } = usePermission("kyc", "view_kyc");

    const { data: summary, isPending } = useQuery({
       queryKey: ["kycSummary"],
       queryFn: () => adminKyc.getInvestorsKycSummary(),
     });

     const { data: investorsKyc, isPending: investorsKycPending } = useQuery({
       queryKey: ["investors-kyc", search, page, limit],
       queryFn: () => adminKyc.getInvestorsKyc({
         search, page, limit, 
       }),
       select: (data: any) => data,
     });

    const handleApprove = async (kyc: any) => {
        const ok = await confirm({
      title: "Approve KYC Dcoument",
      description: "Are you sure you want to approve kyc document for this investor?",
      confirmText: "Approve",
     // type: "approve",
    });
    console.log("Approved:", kyc);
  };

  const handleReject = (kyc: any) => {
    console.log("Rejected:", kyc);
  };

  if(loading) return (
      <Loader />
    )
    
    if(!hasAccess) return (
      <AccessDeniedFullScreen />
    )

  return (
    <AdminPageLayout>
        {ConfirmModalElement}
         <div className="p-1 space-y-6">
        <header className='md:flex justify-between items-center'>
          <h1 className="text-2xl max-[500px]:mb-3 font-semibold">KYC Management</h1>
             <div>
                 <div className='md:flex items-center'>
                 <SearchInput 
                   setSearch={setSearch} placeHolder='Search Investor...'
                 />
              <Button asChild className='h-12 max-[500px]:w-full max-[500px]:mt-3 text-white bg-primary ml-2' variant="outline">
                   <Link href={'/admin/kyc-management/document-requirements'}> View/Update KYC Document Requirements </Link>
                </Button>
                 </div>
             </div>
        </header>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Total KYC Requests"
          amount={summary?.total}
          Icon={<MapPinned className="w-6 h-6 text-primary" />}
          isLoading={isPending}
        />
        <SummaryCard
          title="Approved"
          amount={summary?.approved}
          Icon={<CheckCircle className="w-6 text-green-600 h-6" />}
          isLoading={isPending}
        />
        <SummaryCard
          title="Rejected"
          amount={summary?.rejected}
          Icon={<XCircle className="w-6 text-red-600 h-6" />}
          isLoading={isPending}
        />
        <SummaryCard
          title="Awaiting Requests"
          amount={summary?.pending}
          Icon={<FileUser className="w-6 text-orange-500 h-6" />}
          isLoading={isPending}
        />
       </div>
       <section className="bg-white rounded-xl shadow p-4">
        {
          investorsKycPending ? (
            <Loader size={8} color='text-primary'  />
          ):
          !investorsKyc?.data?.length ?
            <EmptyData text='No KYC Requests Found' />
          :
         <Table className='w-full overflow-x-auto'>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investorsKyc?.data?.map((kyc: any) => (
            <TableRow key={kyc.id}>
              <TableCell>{kyc?.investor?.name}</TableCell>
              <TableCell>{kyc?.investor?.email}</TableCell>
              <TableCell>{kyc?.investor?.phone_number}</TableCell>
              <TableCell>
                  <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    kyc.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : kyc.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {kyc.status}
                </span>
              </TableCell>
              <TableCell>{new Date(kyc.createdAt).toDateString()}</TableCell>
              <TableCell>{new Date(kyc.updatedAt).toDateString()}</TableCell>
              <TableCell className="">
                <Button
                  onClick={() => {
                    sessionStorage.setItem("investor-kyc", JSON.stringify(kyc));
                    router.push(`/admin/kyc-management/${kyc?.investor?.id}/documents`);
                  }}
                >
                  <Eye className="w-4 h-4 text-white" />
                  View Documents
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       }
       </section>
       {investorsKyc?.pagination ?
               <Pagination
                 pagination={investorsKyc?.pagination}
                 onPageChange={(p) => setPage(p)}
                 onPageSizeChange={(s) => setLimit(s)}
             /> : null}
        </div>
    </AdminPageLayout>
  )
}

export default page