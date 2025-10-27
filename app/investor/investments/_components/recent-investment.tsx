"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const recentInvestments = [
  {
    id: 1,
    plan: "Real Estate Growth",
    amount: 200000,
    roi: 15,
    expectedWithdrawalDate: "2025-12-31",
    profitProgress: 70,
    currentProfit: 105000,
    status: "Completed",
  },
  {
    id: 2,
    plan: "Tech Startups Fund",
    amount: 150000,
    roi: 20,
    expectedWithdrawalDate: "2026-03-15",
    profitProgress: 45,
    currentProfit: 67500,
    status: "Pending",
  },
  {
    id: 3,
    plan: "Agro Investment",
    amount: 100000,
    roi: 12,
    expectedWithdrawalDate: "2025-11-10",
    profitProgress: 90,
    currentProfit: 108000,
    status: "Completed",
  },
]

const RecentInvestmentsTable = () => {
  return (
    <div className="mt-10 p-3 bg-white">
      <h2 className="text-lg border-b font-semibold mb-4">Recent Investments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            <TableHead>Amount ($)</TableHead>
            <TableHead>ROI (%)</TableHead>
            <TableHead>Expected Withdrawal</TableHead>
            <TableHead>Profit Progress</TableHead>
            <TableHead>Current Profit ($)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentInvestments.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.plan}</TableCell>
              <TableCell>{inv.amount.toLocaleString()}</TableCell>
              <TableCell>{inv.roi}%</TableCell>
              <TableCell>{inv.expectedWithdrawalDate}</TableCell>
              <TableCell className="w-[200px]">
                 <Progress
                  value={inv.profitProgress}
                  className={`h-2 ${
                    inv.profitProgress < 30
                      ? "bg-blue-100 [&>div]:bg-blue-500"
                      : inv.profitProgress < 60
                      ? "bg-orange-100 [&>div]:bg-orange-500"
                      : "bg-green-100 [&>div]:bg-green-600"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">{inv.profitProgress}% of yearly profit</p>
              </TableCell>
              <TableCell>{inv.currentProfit.toLocaleString()}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inv.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {inv.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant={ inv.status === "Completed" ? "default" : "outline"}
                  disabled={inv.status !== "Completed"}
                >
                  Withdraw
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RecentInvestmentsTable
