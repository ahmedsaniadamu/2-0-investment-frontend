'use client'
import React from 'react';
import AdminPageLayout from '../../_components/admin-page-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleUserRound, CheckCircle, EllipsisVertical, MessageSquareQuote, Star } from "lucide-react";
import SummaryCard from '@/app/investor/_components/summary-card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSessionUserId } from '@/hooks/use-session-user-id';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/components/pagination';
import Loader from '@/components/loader';
import EmptyData from '@/components/empty-data';
import { formatNumberWithCommas } from '@/lib/format-number';
import { useRouter } from 'next/navigation';
import { usePermission } from '@/hooks/use-permission';
import AccessDeniedFullScreen from '../../_components/access-denied';
import { feedbackService } from '@/services/feedback';
import ViewMore from './_components/view-more';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const page = () => {

  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(5)
  const userId = useSessionUserId();
  const { push } = useRouter();
  const { hasAccess, loading } = usePermission('investors', 'view_investors_feedbacks');

  const { data: summary, isPending } = useQuery({
    queryKey: ["feedbackSummary"],
    queryFn: () => feedbackService.getFeedbackSummary(),
    // select: (data: any) => data?.data,
  });

  const { data: feedbacks, isPending: feedbackPending } = useQuery({
    queryKey: ["feedback", userId, search, page, limit],
    queryFn: () => feedbackService.getFeedbackLists({
      search, page, limit,
    }),
    enabled: !!userId,
    select: (data: any) => data,
  });

  const queryClient = useQueryClient();

  const { mutate: deleteFeedback, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => feedbackService.deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      queryClient.invalidateQueries({ queryKey: ["feedbackSummary"] });
      toast.success("Feedback deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  if (loading) return (
    <Loader />
  )

  if (!hasAccess) return (
    <AccessDeniedFullScreen />
  )

  return (
    <AdminPageLayout>
      <div className="p-3 space-y-6">
        <header className='md:flex justify-between items-center'>
          <h1 className="text-2xl max-[500px]:mb-3 font-semibold">
            Investors Feedback Overview
          </h1>
          <div>
            <div className='flex items-center'>
              <Button
                onClick={() => {
                  window.history.back()
                }}
                className='h-12 text-white bg-primary ml-2' variant="outline">
                Back
              </Button>
            </div>
          </div>
        </header>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SummaryCard
            title="Total Feedbacks"
            amount={summary?.totalFeedbacks}
            isLoading={isPending}
            Icon={<MessageSquareQuote className="w-6 h-6 text-primary" />}
          />
          <SummaryCard
            title="Average Ratings"
            isLoading={isPending}
            amount={
              summary?.averageRating ?
                summary?.averageRating.toFixed(2)
                : 0
            }
            Icon={<Star className="w-6 h-6 text-yellow-600" />}
          />
        </div>

        {/* Investors Table */}
        <div className="bg-white overflow-x-auto p-3 rounded-2xl shadow-sm border">
          {
            feedbackPending ? (
              <Loader size={8} color='text-primary' />
            ) :
              !feedbacks?.data?.length ?
                <EmptyData text='No Feedbacks Found' />
                :
                <section className='overflow-x-auto w-full p-1'>
                  <Table className='overflow-x-auto w-full'>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Investor Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        feedbacks?.data?.map((feedback: any, index: number) => (
                          <TableRow key={feedback?.id}>
                            <TableCell>{
                              index + 1 +
                              ((feedbacks?.pagination?.currentPage || 1) - 1) *
                              (limit)
                            }</TableCell>
                            <TableCell className="font-medium">{feedback?.investor?.name}</TableCell>
                            <TableCell>{feedback?.investor?.email}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-primary">{feedback?.rating}</span>
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[300px] truncate">
                              {feedback?.comment}
                            </TableCell>
                            <TableCell>{new Date(feedback?.createdAt).toLocaleDateString('en-ng')}</TableCell>
                            <TableCell className="text-xs text-right">
                              <div className="flex justify-end items-center gap-2">
                                <ViewMore feedback={feedback} />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the feedback
                                        comment from the investor.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        disabled={isDeleting}
                                        onClick={() => deleteFeedback(feedback?.id)}
                                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                                      >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </section>
          }
        </div>
        {feedbacks?.pagination ?
          <Pagination
            pagination={feedbacks?.pagination}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(s) => setLimit(s)}
          /> : null}
      </div>
    </AdminPageLayout>
  )
}

export default page