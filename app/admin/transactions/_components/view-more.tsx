'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatNumberWithCommas } from '@/lib/format-number'
import { Calendar, CreditCard, Target, Info, Hash, User, Mail } from 'lucide-react'

interface ViewMoreProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedTxn: any
}

const ViewMore = ({ isOpen, setIsOpen, selectedTxn: transaction }: ViewMoreProps) => {

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "success":
      case "successful":
      case "succeeded":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      case "rejected":
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100"
    }
  }

  const DetailItem = ({ icon: Icon, label, value, isBadge = false }: { icon: any, label: string, value: string, isBadge?: boolean }) => (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className="p-2 bg-slate-50 rounded-lg">
        <Icon size={18} className="text-slate-500" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {isBadge ? (
          <Badge className={`${getStatusColor(value)} w-fit capitalize px-2 py-0`}>
            {value || 'N/A'}
          </Badge>
        ) : (
          <span className="text-sm font-semibold text-slate-900 break-all">{value || 'N/A'}</span>
        )}
      </div>
    </div>
  )

  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            Transaction Details
          </DialogTitle>
          <DialogDescription>
            Comprehensive record of this transaction and investor information.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
          <DetailItem
            icon={User}
            label="Investor Name"
            value={transaction.Investor?.name}
          />
          <DetailItem
            icon={Mail}
            label="Email Address"
            value={transaction.Investor?.email}
          />
          <DetailItem
            icon={Hash}
            label="Transaction ID"
            value={transaction.transactionId || transaction.id}
          />
          <DetailItem
            icon={Calendar}
            label="Date Created"
            value={new Date(transaction.createdAt).toLocaleString('en-ng')}
          />
          <DetailItem
            icon={Target}
            label="Investment Plan"
            value={transaction.Plan?.name}
          />
          <DetailItem
            icon={Info}
            label="Transaction Type"
            value={transaction.type}
          />
          <DetailItem
            icon={CreditCard}
            label="Amount"
            value={`$${formatNumberWithCommas(parseFloat(transaction.amount))}`}
          />
          <DetailItem
            icon={CreditCard}
            label="Payment Method"
            value={transaction.paymentMethod}
          />
          <DetailItem
            icon={Info}
            label="Approval Status"
            value={transaction.status}
            isBadge={true}
          />
          <DetailItem
            icon={Info}
            label="Transaction Status"
            value={transaction.transactionStatus}
            isBadge={true}
          />
        </div>

        <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
          <div>
            <span className="text-sm font-medium text-slate-500 block mb-1 underline decoration-primary/30">Investment Goal</span>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              "{transaction.investmentGoal || 'No goal specified'}"
            </p>
          </div>

          {transaction.reason && transaction.status === "rejected" && (
            <div>
              <span className="text-sm font-medium text-red-500 block mb-1">Rejection Reason</span>
              <div
                className="text-sm text-slate-700 bg-red-50 p-2 rounded border border-red-100"
                dangerouslySetInnerHTML={{ __html: transaction.reason }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewMore