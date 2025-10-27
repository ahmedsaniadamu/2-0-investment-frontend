// import React from 'react'
// import InvestorPageLayout from '../../_components/investor-page-layout'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { plans } from '@/components/plans-section'
// import InvestmentForm from './_components/investment-form'

// const page = () => {
//   return (
//     <InvestorPageLayout>
//       <section className='flex justify-between h-screen'>
//          <div className='w-[30%] bg-white p-3'>
//            <h5 className='font-semibold mb-3'>Selected Investments Plan</h5>
//              <div className="grid gap-8 md:grid-cols-1">
// 					{plans.slice(0, 1).map((plan) => (
// 						<Card key={plan.name} className={ 'border-0 shadow-none' + plan.popular ? "relative" : ""}>
// 							{plan.popular && (
// 								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
// 									<span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
// 										Most Popular
// 									</span>
// 								</div>
// 							)}

// 							<CardHeader>
// 								<CardTitle className="text-xl">{plan.name}</CardTitle>
// 								<CardDescription>{plan.description}</CardDescription>
// 							</CardHeader>

// 							<CardContent className="space-y-6 shadow-none">
// 								<div>
// 									<div className="flex items-baseline gap-2">
// 										<span className="text-2xl text-foreground">{plan.roi}</span>
// 										<span className="text-muted-foreground">annual ROI</span>
// 									</div>
// 									<div className="mt-2 text-sm text-muted-foreground">
// 										Investment Range:
// 										<div className="font-semibold text-foreground">
// 											{plan.minDeposit} - {plan.maxDeposit}
// 										</div>
// 									</div>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					))}
// 				</div>
//          </div>
//          <div className='w-[68%]'>
//            <InvestmentForm />
//          </div>
//       </section>
//     </InvestorPageLayout>
//   )
// }

// export default page