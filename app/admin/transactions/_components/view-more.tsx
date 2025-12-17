'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from '@/lib/format-number';
const ViewMore = ({isOpen, setIsOpen, selectedTxn}: {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  selectedTxn: any
}) => {
  return (
    <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
             
          </DialogHeader>
          {selectedTxn && (
            <div className="space-y-2 text-sm">
              <p><strong>Investor:</strong> {selectedTxn?.Investor?.name}</p>
              <p><strong>Email:</strong> {selectedTxn?.Investor?.email}</p>
              <p><strong>Type:</strong> {selectedTxn.type}</p>
              <p><strong>Plan:</strong> {selectedTxn?.Plan?.name}</p>
              <p><strong>Amount:</strong> {formatNumberWithCommas(selectedTxn?.amount)}</p>
              <p><strong>Method:</strong> {selectedTxn?.paymentMethod}</p>
              <p><strong>Status:</strong> <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedTxn.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : selectedTxn.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedTxn.status}
                </span></p>
              <p><strong>Date:</strong> {new Date(selectedTxn?.createdAt).toLocaleDateString('en-ng')}</p>
              <p><strong>Goal:</strong> {selectedTxn?.investmentGoal}</p>
              {
                selectedTxn?.reason && selectedTxn?.status === "rejected" ? 
                   <p><strong>Reason:</strong> <p dangerouslySetInnerHTML={{__html: selectedTxn?.reason}} /></p>
                : null
              }
            </div>
          )}
          <div className="flex justify-end gap-3 mt-1">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewMore