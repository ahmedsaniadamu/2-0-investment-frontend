'use client'
import React, { useState } from 'react'
import { transactions } from '../../_components/dummy-data'; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toastMessage } from '@/lib/custom-toast';
import ViewMore from './view-more';
import ConfirmActionModal from '@/components/comfirmation-modal';
import { formatNumberWithCommas } from '@/lib/format-number';
import EmptyData from '@/components/empty-data';
import { adminTransactions } from '@/api/transaction';
import { useMutation } from '@tanstack/react-query';
import { useConfirmModal } from '@/components/useConfirmationModal';
import { SpinnerCustom } from '@/components/ui/spinner';
import AddReasonModal from './add-reason';
import { usePermission } from '@/hooks/use-permission';

const Withdrawal = ({transactions, limit, refetch, refetchSummary}: {
  transactions: any, limit: number, 
  refetch: any,
  refetchSummary: any
}) => {
 
   const [selectedTxn, setSelectedTxn] = useState<any | null>(null);
   const [isOpen, setIsOpen] = useState(false);
   const [openReasonModal, setOpenReasonModal] = useState(false);
   const {confirm, ConfirmModalElement} = useConfirmModal();
   const [activeTxn, setActiveTxn] = useState<any | null>(null);
   const { hasAccess, loading } = usePermission("transactions", "review_transactions");

    const { mutateAsync: addReason, isPending } = useMutation({
    mutationFn: adminTransactions.reviewTransaction,
    mutationKey: ["state-reason"],
  });

   const handleApprove = async (txn: any) => {

    const ok = await confirm({
      title: `Approve ${txn.Investor?.name}'s Transaction`,
      description: "Are you sure you want to approve this transaction?",
      confirmText: "Approve",
     // type: "approve",
    });
    if(ok){
      try {
        await addReason({id: txn.id, status: "approved"});
        refetch();
        refetchSummary();
        toastMessage(
          "success",
          "Transaction Approved ✅",
          `Transaction for ${txn.Investor?.name} has been approved.`,
        );
      } catch (error: any) {
        console.log(error);
        
        toastMessage(
          "error",
          "Error❌",
          error?.response?.data?.message || "Failed to approve transaction",
        );
      }
    }
  };

  const handleReject = async(txn: any) => {
    const ok = await confirm({
      title: `Reject ${txn.Investor?.name}'s Transaction`,
      description: "Are you sure you want to reject this transaction?",
      confirmText: "Yes, Reject",
      type: "reject",
    });
    setActiveTxn(txn);
    if(ok) setOpenReasonModal(true);
  };

 
  return (
    <div>
        {ConfirmModalElement}
        {
          openReasonModal ? 
            <AddReasonModal 
            open={openReasonModal} setOpen={setOpenReasonModal} id={activeTxn?.id}
             refetch={refetch} refetchSummary={refetchSummary}
            />
          : null
        }
        <ViewMore isOpen={isOpen} setIsOpen={setIsOpen} selectedTxn={selectedTxn} />
         {
          !transactions?.data?.length ?
            <EmptyData text='No Withdrawal Found' />
          :
           <>
              <Table className='w-full overflow-x-auto'>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Investor</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.data.map((txn: any, index: number) => (
            <TableRow key={txn?.id} className='py-3 h-16'>
              <TableCell>
                {
                  index + 1 +
                 ( (transactions?.pagination?.currentPage || 1) - 1) *
                  ( limit )
                  }
              </TableCell>
              <TableCell>{txn?.Investor?.name}</TableCell>
              <TableCell>{txn?.Investor?.email}</TableCell>
              <TableCell>{txn?.Plan?.name}</TableCell>
              <TableCell className='font-bold text-primary'>${formatNumberWithCommas(txn?.amount)}</TableCell>
              <TableCell>{txn?.paymentMethod}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    txn.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : txn.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {txn.status}
                </span>
              </TableCell>
              <TableCell>
                {new Date(txn?.createdAt).toLocaleDateString('en-ng')}
              </TableCell>
               <TableCell className="flex gap-3 items-center">
                  {
                    hasAccess ? 
                      <>
                      <Eye
                        className="w-5 h-5 text-blue-600 cursor-pointer"
                        onClick={() => {
                          setSelectedTxn(txn);
                          setIsOpen(true);
                        }}
                      />
                      {
                        isPending && activeTxn?.id === txn?.id ?
                          <SpinnerCustom />
                          :
                          <CheckCircle
                            className="w-5 h-5 text-green-600 cursor-pointer"
                            onClick={() => {
                              setActiveTxn(txn);
                              handleApprove(txn)
                            }}
                          />
                      }
                      <XCircle
                        className="w-5 h-5 text-red-600 cursor-pointer"
                        onClick={() => {
                          setActiveTxn(txn);
                          handleReject(txn)
                        }}
                      />
                      </>
                    : '----------'
                  }
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
           </>
         }
    </div>
  )
}

export default Withdrawal