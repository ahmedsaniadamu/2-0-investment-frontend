'use client'
import React from 'react'
import InvestorPageLayout from '../_components/investor-page-layout'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowDownToLine, ArrowUpRight, ArrowUpToLine } from 'lucide-react'
import { CircleDollarSign, CheckCircle, Clock, XCircle } from "lucide-react"
import SummaryCard from '../_components/summary-card'

const page = () => {

  const transactions = [
  {
    id: 1,
    type: "Deposit",
    investmentGoal: "Real Estate Fund",
    amount: 50000,
    paymentMethod: "Wallet",
    startDate: "2025-09-12",
    status: "Approved",
  },
  {
    id: 2,
    type: "Withdrawal",
    investmentGoal: "Tech Growth Fund",
    amount: 20000,
    paymentMethod: "Bank Transfer",
    startDate: "2025-10-01",
    status: "Pending",
  },
  {
    id: 3,
    type: "Deposit",
    investmentGoal: "Agriculture Plan",
    amount: 80000,
    paymentMethod: "Card (Interswitch)",
    startDate: "2025-08-20",
    status: "Rejected",
  },
  {
    id: 4,
    type: "Deposit",
    investmentGoal: "Crypto Index Fund",
    amount: 100000,
    paymentMethod: "Wallet",
    startDate: "2025-07-10",
    status: "Approved",
  },
]

// Badge color logic
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-700"
    case "pending":
      return "bg-yellow-100 text-yellow-700"
    case "rejected":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

  return (
    <InvestorPageLayout>
      <section className="grid gap-5 mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-8">
        <SummaryCard
          title="Total Transactions"
          amount="45"
          Icon={<CircleDollarSign className="w-6 h-6 text-[#005b9e]" />}
          isLoading={false}
        />

        <SummaryCard
          title="Approved"
          amount="28"
          Icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          isLoading={false}
        />

        <SummaryCard
          title="Pending"
          amount="12"
          Icon={<Clock className="w-6 h-6 text-orange-500" />}
          isLoading={false}
        />

        <SummaryCard
          title="Rejected"
          amount="5"
          Icon={<XCircle className="w-6 h-6 text-red-600" />}
          isLoading={false}
        />
      </section>
      <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <Table>
        <TableCaption>A list of your recent deposits and withdrawals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Investment Goal</TableHead>
            <TableHead>Amount ($)</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-medium flex gap-1 w-[150px] justify-between">{tx.type}
                {tx.type == 'Deposit' ? <ArrowUpToLine className="ml-2 text-green-500" size={16} /> : <ArrowDownToLine className="ml-2 text-orange-500" size={16} /> }
              </TableCell>
              <TableCell>{tx.investmentGoal}</TableCell>
              <TableCell>${tx.amount.toLocaleString()}</TableCell>
              <TableCell>{tx.paymentMethod}</TableCell>
              <TableCell>{tx.startDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </InvestorPageLayout>
  )
}

export default page