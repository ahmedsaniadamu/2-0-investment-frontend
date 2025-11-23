'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import InvestorPageLayout from '../_components/investor-page-layout'
import { sharedPlans } from '@/api/plan'
import { useQuery } from '@tanstack/react-query'
import InvestmentForm from './_components/investment-form'
import Loader from '@/components/loader'
import { formatNumberWithCommas } from "@/lib/format-number"

const page = () => {

 const [openModal, setOpenModal] = React.useState(false);
 const [activePlan, setActivePlan] = React.useState<any>(null);

 const { data: availablePlans, isPending } = useQuery({
    queryKey: ["get-plans"],
    queryFn: () => sharedPlans.getPlans(),
  });

  return (
    <InvestorPageLayout>
        {
            openModal ?
              <InvestmentForm activePlan={activePlan} setActivePlan={setActivePlan} setOpen={setOpenModal} open={openModal} />
            : null
        }
         <header className='flex justify-between items-center'>
             <h1 className="text-2xl font-semibold">Investment Plans Overview</h1>
             <div>
                 <div className='flex items-center'>
                <Input
                  type="search"
                  placeholder="Search plans..." 
                />
                <Button className='h-12 bg-white ml-2' variant="outline">
                   <Search/> Search
                </Button>
                 </div>
             </div>
        </header>
        {
        isPending  ? (
           <Loader />
        ) :
          <div className="grid mt-8 gap-5 md:grid-cols-3">
           { availablePlans?.length ? (
              [...availablePlans].map((plan: any, i: number) => {
                  const isPopular =
                  [...availablePlans].sort((a, b) => b.investmentCount - a.investmentCount)[0]
                    ?.investmentCount === plan?.investmentCount;

                return (
                  <Card
                    key={plan.name + i}
                    className={`mb-3 flex-shrink-0 ${
                      isPopular ? "relative border-primary shadow-lg" : ""
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-4 z-[1000] left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-foreground">{plan.roi}</span>
                          <span className="text-muted-foreground">annual ROI</span>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Investment Range:
                          <div className="font-semibold text-foreground">
                            ${formatNumberWithCommas(plan.minDeposit)} - ${formatNumberWithCommas(plan.maxDeposit)}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button className="w-full" onClick={() => {
                        setActivePlan(plan)
                        setOpenModal(true)
                      }}>
                         Invest Now
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
        ) : null
        }
	    </div>
        }
    </InvestorPageLayout>
  )
}

export default page