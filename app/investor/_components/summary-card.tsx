import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CircleDollarSign, Shield } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const SummaryCard = ({
    title, amount, Icon, isLoading
}: {title: string, amount: string, Icon: any, isLoading: boolean}) => {
  
    if(isLoading) return <Skeleton className="h-[140px] bg-slate-100 rounded-lg" />
  
    return (
    <Card className="w-full py-5 md:py-2 md:max-w-sm">
            <CardHeader>
              <h5 className='flex justify-end'>
                {Icon}
              </h5>
              <CardTitle>
                {title}
              </CardTitle>
              <CardDescription>
                 <h2 className='text-3xl font-bold'>{amount}</h2>
              </CardDescription>
              </CardHeader>
            <CardContent>
            </CardContent>
    </Card>
  )
}

export default SummaryCard