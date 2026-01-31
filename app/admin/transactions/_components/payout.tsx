'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toastMessage } from '@/lib/custom-toast';
import ViewMore from './view-more';
import { formatNumberWithCommas } from '@/lib/format-number';
import EmptyData from '@/components/empty-data';
import { adminTransactions } from '@/services/transaction';
import { useMutation } from '@tanstack/react-query';
import { useConfirmModal } from '@/components/useConfirmationModal';
import { SpinnerCustom } from '@/components/ui/spinner';
import { usePermission } from '@/hooks/use-permission';
import { calculateInvestmentMetrics } from '../../investors/[investor_id]/investments/page';

const Payout: React.FC<{ transactions: any, limit: number, refetch: any, refetchSummary: any }> = ({ transactions, limit, refetch, refetchSummary }) => {

    const [selectedTxn, setSelectedTxn] = useState<any | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { confirm, ConfirmModalElement } = useConfirmModal();
    const [activeTxn, setActiveTxn] = useState<any | null>(null);
    const { hasAccess, loading } = usePermission("transactions", "review_transactions");

    const { mutateAsync: reviewTransaction, isPending } = useMutation({
        mutationFn: adminTransactions.reviewTransaction,
        mutationKey: ["review-payout"],
    });

    const { mutateAsync: processPayout, isPending: isProcessing } = useMutation({
        mutationFn: adminTransactions.processPayout,
        mutationKey: ["process-payout"],
    });

    const handleProcessPayout = async (txn: any) => {
        const ok = await confirm({
            title: `Process Payout for ${txn.Investor?.name}`,
            description: "Are you sure you want to process this payout? once processed, it cannot be undone.",
            confirmText: "Yes, Process Payout",
        });

        if (ok) {
            setActiveTxn(txn);
            try {
                const res = await processPayout({ id: txn.id });
                refetch();
                refetchSummary();
                confirm({
                    title: "Success",
                    description: res?.message || `Payout for ${txn.Investor?.name} has been processed successfully.`,
                    confirmText: "OK",
                });
            } catch (error: any) {
                confirm({
                    title: "Error",
                    description: error?.response?.data?.message || "Failed to process payout",
                    confirmText: "OK",
                    type: "reject",
                });
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
            case "success":
            case "successful":
            case "succeeded":
            case "processed":
                return "bg-green-100 text-green-700"
            case "pending":
            case "processing":
                return "bg-yellow-100 text-yellow-700"
            case "rejected":
            case "failed":
            case "cancelled":
                return "bg-red-100 text-red-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    return (
        <div>
            {ConfirmModalElement}
            <ViewMore isOpen={isOpen} setIsOpen={setIsOpen} selectedTxn={selectedTxn} />
            {
                !transactions?.data?.length ?
                    <EmptyData text='No Payouts Found' />
                    :
                    <div className="overflow-x-auto w-full">
                        <Table className='min-w-[1200px]'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Investor</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Amount To Be Paid</TableHead>
                                    {/* <TableHead>Profit</TableHead>
                                    <TableHead>Total (Inc. Profit)</TableHead> */}
                                    <TableHead>Payout Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.map((txn: any, index: number) => {
                                    const metrics = txn.Plan ? calculateInvestmentMetrics({
                                        ...txn,
                                        plan: txn.Plan
                                    }) : { currentProfit: "0" };
                                    const profit = parseFloat(metrics.currentProfit);
                                    const amount = parseFloat(txn.amount || 0);
                                    const total = amount + profit;

                                    return (
                                        <TableRow key={txn?.id} className='py-3 h-16'>
                                            <TableCell>
                                                {
                                                    index + 1 +
                                                    ((transactions?.pagination?.currentPage || 1) - 1) *
                                                    (limit)
                                                }
                                            </TableCell>
                                            <TableCell>{txn?.Investor?.name}</TableCell>
                                            <TableCell>{txn?.Investor?.email}</TableCell>
                                            <TableCell>{txn?.Plan?.name}</TableCell>
                                            <TableCell className='font-bold text-primary'>${formatNumberWithCommas(amount)}</TableCell>
                                            {/* <TableCell className='font-bold text-green-600'>${formatNumberWithCommas(profit)}</TableCell>
                                            <TableCell className='font-bold text-primary'>${formatNumberWithCommas(total)}</TableCell> */}
                                            <TableCell>
                                                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(txn.payoutStatus)}`}>
                                                    {txn.payoutStatus || 'N/A'}
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
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                disabled={txn.payoutStatus === 'success' || (isProcessing && activeTxn?.id === txn.id)}
                                                                onClick={() => handleProcessPayout(txn)}
                                                                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors h-9 px-4"
                                                            >
                                                                {isProcessing && activeTxn?.id === txn.id ? <SpinnerCustom /> : 'Process Payout'}
                                                            </Button>
                                                        </>
                                                        : '----------'
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
            }
        </div>
    )
}

export default Payout