"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { InvestmentChart } from "@/components/investment-chart"
import { TransactionsTable } from "@/components/transactions-table"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawModal } from "@/components/withdraw-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Welcome back, John</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setWithdrawOpen(true)}>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
            <Button onClick={() => setDepositOpen(true)}>
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Deposit Funds
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <StatsCards />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <InvestmentChart />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active investment plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="mb-2 text-sm font-medium text-muted-foreground">Growth Plan</div>
                  <div className="mb-1 text-2xl font-bold text-foreground">12% ROI</div>
                  <div className="text-sm text-muted-foreground">Annual return rate</div>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Principal Amount</span>
                    <span className="font-medium text-foreground">$5,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Value</span>
                    <span className="font-medium text-foreground">$10,250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Profit</span>
                    <span className="font-medium text-accent">+$5,250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Payout</span>
                    <span className="font-medium text-foreground">Jan 1, 2025</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/plans">Upgrade Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <TransactionsTable />
        </div>
      </main>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
      <WithdrawModal open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </div>
  )
}
