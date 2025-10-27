'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { plans } from '@/components/plans-section'
import Link from 'next/link'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InvestmentForm from '../invest/_components/investment-form'

const Plants = () => {

 const [open, setOpen] = React.useState(false)

  return (
    <>
     <Dialog open={open} onOpenChange={setOpen} modal>
        <DialogContent className="sm:max-w-[425px] p-5 rounded-lg bg-white">
          <DialogHeader>
            <DialogTitle>Add Investment</DialogTitle>
          </DialogHeader>
        <InvestmentForm setOpen={setOpen} /> 
        </DialogContent>
    </Dialog>
    <div className="grid mt-3 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "relative border-primary shadow-lg" : ""}>
                {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
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
                                {plan.minDeposit} - {plan.maxDeposit}
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button onClick={ () => setOpen(true) } className="w-full" variant={plan.popular ? "default" : "outline"}>
                       Invest Now
                    </Button>
                </CardFooter>
            </Card>
        ))}
	</div>
    </>
  )
}

export default Plants