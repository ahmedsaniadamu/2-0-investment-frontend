"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownLeft } from "lucide-react"

interface DepositModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Deposit submitted:", { amount, paymentMethod })
    onOpenChange(false)
    setAmount("")
    setPaymentMethod("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDownLeft className="h-5 w-5 text-primary" />
            Deposit Funds
          </DialogTitle>
          <DialogDescription>Add funds to your investment account</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deposit-amount">Amount</Label>
            <Input
              id="deposit-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={100}
              required
            />
            <p className="text-xs text-muted-foreground">Minimum deposit: $100</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deposit-payment">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger id="deposit-payment">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {amount && Number(amount) >= 100 && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deposit Amount</span>
                <span className="font-semibold text-foreground">${Number(amount).toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-semibold text-foreground">$0.00</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-bold text-foreground">${Number(amount).toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Confirm Deposit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
