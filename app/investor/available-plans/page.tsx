'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Filter, PlusCircle, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { plans } from '@/components/plans-section'
import InvestorPageLayout from '../_components/investor-page-layout'

const page = () => {
  return (
    <InvestorPageLayout>
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
        <div className="grid mt-8 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
            <Card key={plan.name}>
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
                                {plan.minDeposit} - {plan.maxDeposit}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button //onClick={ () => setOpen(true) }
                     className="w-full" variant={plan.popular ? "default" : "outline"}>
                        Invest Now
                    </Button>
                </CardFooter>
            </Card>
        ))}
	</div>
    </InvestorPageLayout>
  )
}

export default page