'use client'
import React, { useState } from 'react'
import AdminPageLayout from '../_components/admin-page-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Eye, EyeClosed, EyeOff, Filter, PlusCircle, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { plans } from '@/components/plans-section'
import { useRouter } from 'next/navigation'
import  { adminPlans } from '@/api/plan'
import { useMutation, useQuery } from '@tanstack/react-query'
import SearchInput from '@/components/search'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Loader from '@/components/loader'
import EmptyData from '@/components/empty-data'
import Pagination from '@/components/pagination'
import { formatNumberWithCommas } from '@/lib/format-number'
import { toastMessage } from '@/lib/custom-toast'
import CreatePlanModal from './_components/create-plan'

const page = () => {

      const [search, setSearch] = useState('')
      const [page, setPage] = useState(1)
      const [limit, setLimit] = useState(6)
      const [activePlan, setActivePlan] = useState<any>(null) 
      const [open, setOpen] = useState(false)
      const {push} = useRouter();

       const { data:  investmentPlans, isPending, refetch } = useQuery({
       queryKey: ["get plans", search, page, limit],
       queryFn: () => adminPlans.getPlans({search, page, limit}),
      });

       const { mutateAsync: changeVisibility, isPending: visibilityPending } = useMutation({
        mutationFn: adminPlans.togglePlan,
        mutationKey: ["change-visibility"],
      });

      const togglePlanVisibility = async (id: string, visibility: boolean) => {
        try {
          await changeVisibility({id, visibility});
          toastMessage("success", "Success", "Plan visibility changed successfully");
          refetch();
        } catch (error: any) {
          toastMessage("error", "Error", error?.response?.data?.message || "Failed to change plan visibility");
        }   
      }


  return (
    <AdminPageLayout>
        {
            open ? 
              <CreatePlanModal open={open} setOpen={setOpen} refetch={refetch} />
            : null
        }
         <header className='md:flex mt-3 justify-between items-center'>
              <h1 className="text-2xl max-[500px]:mb-3 font-semibold">Plans Management Overview</h1>
             <div>
                 <div className='md:flex items-center'>
                 <SearchInput 
                    setSearch={setSearch} placeHolder='Search plans...'
                  />
                      <Button onClick={() => setOpen(true)} className='h-12 max-[500px]:mt-3 max-[500px]:w-full text-white bg-primary ml-2' variant="outline">
                   <PlusCircle /> Create Investment Plan
                </Button>
                 </div>
             </div>
        </header>
        {
            isPending ? (
            <Loader size={8} color='text-primary'  />
          ):
          !investmentPlans?.data?.length ?
            <EmptyData text='No plan Found' />
          :
                      <div className="grid mt-8 max-[500px]:grid-cols-1 gap-5 md:grid-cols-3">
        {
          investmentPlans?.data.map((plan: any) => (
            <Card key={plan.id} className='p-4 pb-0'>
                <CardHeader className='p-2'>
                    <CardTitle className="text-xl flex justify-between items-center">{plan?.name}
                        {
                            activePlan?.id === plan?.id && visibilityPending ? (
                                <Loader size={4} color='text-primary'  />
                            ) :
                            plan?.visibility ? (
                                <Eye className='hover:cursor-pointer' onClick={ () => {
                                    setActivePlan(plan);
                                    togglePlanVisibility(plan?.id, false);
                                } } />
                            ) : (
                                <EyeOff className='hover:cursor-pointer' onClick={ () => {
                                    setActivePlan(plan)
                                    togglePlanVisibility(plan?.id, true)
                                } } />
                            )
                        }
                    </CardTitle>
                    <CardDescription>{plan?.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 p-3 -mt-5">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-foreground">{plan.roi}</span>
                            <span className="text-muted-foreground">annual ROI</span>
                        </div>
                        <div className="mt-0 text-sm text-muted-foreground">
                            Investment Range:
                            <div className="font-semibold text-foreground">
                                {formatNumberWithCommas(plan?.minDeposit)} - {formatNumberWithCommas(plan?.maxDeposit)}
                            </div>
                        </div>
                        <section className='flex mt-3 justify-between'>
                            <span 
                                onClick={ () => push(`/admin/plan-management/${plan?.id}/investments?plan_name=${plan?.name}`) }  
                                className='text-primary hover:cursor-pointer text-md py-0 flex items-center font-bold p-2'>
                               ({plan?.investmentsCount}) Investments
                            </span>
                             <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                <Button className='bg-transparent hover:bg-transparent text-slate-800 p-0'>
                                    <EllipsisVertical />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[180px]">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuGroup className='overflow-x-hidden'>
                                    <DropdownMenuItem onClick={ () => {
                                    // push(`/admin/investors/${investor?.id}/investments?name=${investor?.name}`)
                                    } } className='overflow-x-hidden'>
                                    View Plan Investments
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </section>
                    </div>
                </CardContent>
            </Card>
        ))}
        
	   </div>}
       {investmentPlans?.pagination ?
            <Pagination
                pagination={investmentPlans?.pagination}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(s) => setLimit(s)}
            /> : null
        }
    </AdminPageLayout>
  )
}

export default page