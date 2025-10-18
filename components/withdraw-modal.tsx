"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, AlertCircle } from "lucide-react"

interface WithdrawModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WithdrawModal({ open, onOpenChange }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("")
  const availableBalance = 10250

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Withdrawal submitted:", { amount, withdrawMethod })
    onOpenChange(false)
    setAmount("")
    setWithdrawMethod("")
  }

  const isAmountValid = amount && Number(amount) > 0 && Number(amount) <= availableBalance

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-accent" />
            Withdraw Funds
          </DialogTitle>
          <DialogDescription>Withdraw funds from your investment account</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="text-sm text-muted-foreground">Available Balance</div>
            <div className="mt-1 text-2xl font-bold text-foreground">${availableBalance.toLocaleString()}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
              max={availableBalance}
              required
            />
            {amount && Number(amount) > availableBalance && (
              <div className="flex items-center gap-2 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                <span>Amount exceeds available balance</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdraw-method">Withdrawal Method</Label>
            <Select value={withdrawMethod} onValueChange={setWithdrawMethod} required>
              <SelectTrigger id="withdraw-method">
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer (1-3 days)</SelectItem>
                <SelectItem value="card">Debit Card (3-5 days)</SelectItem>
                <SelectItem value="crypto">Cryptocurrency (Instant)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isAmountValid && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Withdrawal Amount</span>
                <span className="font-semibold text-foreground">${Number(amount).toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-semibold text-foreground">$0.00</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2">
                <span className="font-medium text-foreground">You'll Receive</span>
                <span className="font-bold text-accent">${Number(amount).toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-xs text-muted-foreground">
                Withdrawals are processed according to your plan's terms. Early withdrawals may affect your returns.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!isAmountValid}>
              Confirm Withdrawal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
