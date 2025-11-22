"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Info } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for beginners starting their investment journey",
    minDeposit: 5000,
    roi: 10,
    features: [
      "Quarterly returns",
      "Basic portfolio management",
      "Email support",
      "Investment dashboard",
      "Withdraw anytime",
    ],
  },
  {
    id: "growth",
    name: "Growth Plan",
    description: "Ideal for growing your wealth steadily",
    minDeposit: 10000,
    roi: 12,
    features: [
      "Monthly returns",
      "Advanced portfolio management",
      "Priority email support",
      "Advanced analytics",
      "Withdraw anytime",
      "Dedicated account manager",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Maximum returns for serious investors",
    minDeposit: 25000,
    roi: 15,
    features: [
      "Weekly returns",
      "Premium portfolio management",
      "24/7 phone support",
      "Real-time analytics",
      "Instant withdrawals",
      "Personal investment advisor",
      "Exclusive investment opportunities",
    ],
  },
]

export default function PlansPage() {
  
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleInvest = (plan: (typeof plans)[0]) => {
    setSelectedPlan(plan)
    setAmount(plan.minDeposit.toString())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle investment submission
    console.log("Investment submitted:", { plan: selectedPlan, amount, paymentMethod })
    setSelectedPlan(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Investment Plans</h1>
          <p className="mt-1 text-muted-foreground">Choose the plan that matches your investment goals</p>
        </div>

        <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Investment Information</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                All plans offer flexible withdrawal options and are managed by our expert investment team. Returns are
                calculated annually and distributed according to your plan schedule.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className={plan.popular ? "relative border-primary shadow-lg" : ""}>
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
                    <span className="text-4xl font-bold text-foreground">{plan.roi}%</span>
                    <span className="text-muted-foreground">annual ROI</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Minimum deposit:{" "}
                    <span className="font-semibold text-foreground">${plan.minDeposit.toLocaleString()}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="text-xs text-muted-foreground">Projected 1-year return</div>
                  <div className="mt-1 text-2xl font-bold text-accent">
                    ${((plan.minDeposit * plan.roi) / 100).toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    On ${plan.minDeposit.toLocaleString()} investment
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleInvest(plan)}
                >
                  Invest Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium text-foreground">How do withdrawals work?</h3>
              <p className="text-sm text-muted-foreground">
                You can withdraw your funds at any time. Withdrawals are processed within 1-3 business days depending on
                your plan.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Are my investments insured?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, all investments are protected by our comprehensive insurance policy and regulatory compliance.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Can I upgrade my plan?</h3>
              <p className="text-sm text-muted-foreground">
                You can upgrade to a higher plan at any time to access better returns and features.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">What payment methods are accepted?</h3>
              <p className="text-sm text-muted-foreground">
                We accept bank transfers, credit/debit cards, and cryptocurrency payments for your convenience.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invest in {selectedPlan?.name}</DialogTitle>
            <DialogDescription>Enter your investment details to get started</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Minimum $${selectedPlan?.minDeposit.toLocaleString()}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={selectedPlan?.minDeposit}
                required
              />
              <p className="text-xs text-muted-foreground">Minimum: ${selectedPlan?.minDeposit.toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                <SelectTrigger id="payment">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {amount && selectedPlan && Number(amount) >= selectedPlan.minDeposit && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="text-sm text-muted-foreground">Projected annual return</div>
                <div className="mt-1 text-2xl font-bold text-accent">
                  ${((Number(amount) * selectedPlan.roi) / 100).toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{selectedPlan.roi}% ROI</div>
              </div>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setSelectedPlan(null)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Confirm Investment
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
