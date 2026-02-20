'use client'
export const dynamic = "force-static"
import AdminPageLayout from '@/app/admin/_components/admin-page-layout'
import EmptyData from '@/components/empty-data';
import PageLoader from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { useConfirmModal } from '@/components/useConfirmationModal';
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { adminKyc } from '@/services/kyc';
import { useMutation } from '@tanstack/react-query';
import { toastMessage } from '@/lib/custom-toast';
import AddReasonModal from './_components/add-reason';
import Link from 'next/link';
import { usePermission } from '@/hooks/use-permission';
import AccessDeniedFullScreen from '@/app/admin/_components/access-denied';
import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';

const page = () => {

  const { confirm, ConfirmModalElement } = useConfirmModal();
  const [investorKyc, setInvestorKyc] = React.useState<any>(null);
  const [openReasonModal, setOpenReasonModal] = useState(false);
  const { hasAccess, loading } = usePermission("kyc", "view_kyc");
  const { hasAccess: hasReviewAccess } = usePermission("kyc", "review_kyc");
  const router = useRouter();

  useEffect(() => {
    const investorKyc = sessionStorage.getItem('investor-kyc');
    if (investorKyc) {
      setInvestorKyc(JSON.parse(investorKyc));
    }
  }, [])

  const { mutateAsync: reviewKyc, isPending } = useMutation({
    mutationFn: adminKyc.reviewInvestorKyc,
    mutationKey: ["state-reason"],
  });

  const handleApprove = async (kyc: any) => {
    if (!hasReviewAccess) return toastMessage("error", "Error", "You don't have permission to approve KYC document");
    const ok = await confirm({
      title: "Approve KYC Dcoument",
      description: "Are you sure you want to approve kyc document for this investor?",
      confirmText: "Approve",
      // type: "approve",
    });
    if (ok) {
      try {
        await reviewKyc({ id: investorKyc?.id, status: "approved" });
        toastMessage("success", "Success", "KYC document approved successfully, Investor will recieve a mail about this approval");
        setInvestorKyc({ ...investorKyc, status: "approved" });
        setTimeout(() => {
          router.push(`/admin/kyc-management`);
        }, 1000);
      } catch (error: any) {
        toastMessage("error", "Error", error?.response?.data?.message || "Failed to approve KYC document");
      }
    }
  };

  const handleReject = async (kyc: any) => {
    if (!hasReviewAccess) return toastMessage("error", "Error", "You don't have permission to reject KYC document");
    const ok = await confirm({
      title: "Reject KYC Dcoument",
      description: "Are you sure you want to reject kyc document for this investor?",
      confirmText: "Reject",
      type: 'reject'
    })
    if (ok) {
      setOpenReasonModal(true);
    }
  };

  if (!investorKyc) return <PageLoader />
  if (loading) return (
    <Loader />
  )

  if (!hasAccess) return (
    <AccessDeniedFullScreen />
  )

  return (
    <AdminPageLayout>
      {ConfirmModalElement}
      {
        openReasonModal ?
          <AddReasonModal
            open={openReasonModal}
            setOpen={setOpenReasonModal}
            investorKyc={investorKyc}
            setInvestorKyc={setInvestorKyc}
          />
          : null
      }
      <div className="p-1 space-y-6">
        <header className='md:flex justify-between items-center'>
          <h1 className="text-2xl max-[500px]:mb-3 font-semibold">
            KYC Documents For ({investorKyc?.investor?.name})
          </h1>
          <div>
            <div className='md:flex md:gap-4 md:items-center max-[500px]:grid max-[500px]:grid-cols-2 max-[500px]:gap-4'>
              <Button disabled={isPending || investorKyc?.status === 'approved' || investorKyc?.status === 'rejected'} style={{ opacity: investorKyc?.status === 'approved' || isPending ? 0.5 : 1 }} onClick={handleApprove} className='h-12 text-white bg-primary ml-2'>
                {
                  isPending ? <Loader /> : 'Approve'
                }
              </Button>
              <Button style={{
                opacity: investorKyc?.status === 'rejected' || isPending ||
                  investorKyc?.status === 'approved'
                  ? 0.5 : 1
              }} disabled={investorKyc?.status === 'rejected' || isPending || investorKyc?.status === 'approved'} onClick={handleReject} className='h-12 text-white ml-2' variant='destructive'>
                Reject
              </Button>
              <Button asChild className='h-12 bg-white ml-2' variant='outline'>
                <Link href={`/admin/investors/${investorKyc?.investor?.id}/profile`}>View Profile</Link>
              </Button>
              <Button onClick={() => router.back()} className='h-12 bg-white ml-2' variant='outline'>
                Back
              </Button>
            </div>
          </div>

        </header>
        <header className='grid max-[500px]:grid-cols-1 grid-cols-4 gap-5'>
          <div className='shadow py-5 rounded-lg px-3 bg-white flex justify-center items-center flex-col'>
            <h3 className='text-md font-medium'>
              Total Documents
            </h3>
            <h3 className='text-2xl font-semibold'>
              {investorKyc?.documents?.length}
            </h3>
          </div>
          <div className='shadow py-5 rounded-lg px-3 bg-white flex justify-center items-center flex-col'>
            <h3 className='text-md font-medium'>
              KYC Status
            </h3>
            <h3 className='text-2xl font-semibold'>
              <span
                className={`px-3 py-1 text-sm rounded-full ${investorKyc.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : investorKyc.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {investorKyc.status}
              </span>
            </h3>
          </div>
          <div className='shadow py-5 rounded-lg px-3 bg-white flex justify-center items-center flex-col'>
            <h3 className='text-md font-medium'>
              Date Submitted
            </h3>
            <h3 className='text-sm font-semibold'>
              {new Date(investorKyc.createdAt).toDateString()}
            </h3>
          </div>
          <div className='shadow py-5 rounded-lg px-3 bg-white flex justify-center items-center flex-col'>
            <h3 className='text-md font-medium'>
              Last Updated
            </h3>
            <h3 className='text-sm font-semibold'>
              {new Date(investorKyc.updatedAt).toDateString()}
            </h3>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-6 mt-6">
          {investorKyc?.documents?.length ? (
            investorKyc.documents.map((doc: any, index: number) => {
              const isImage =
                doc.url.endsWith(".jpg") ||
                doc.url.endsWith(".jpeg") ||
                doc.url.endsWith(".png") ||
                doc.url.endsWith(".webp");

              const isPDF = doc.url.endsWith(".pdf");

              return (
                <Card key={index} className="overflow-hidden rounded-xl border shadow">
                  <CardHeader className='md:flex justify-between'>
                    <CardTitle className="text-lg max-[500px]:w-full max-[500px]:mb-3">{doc.title}</CardTitle>
                    <Button className="mx-aut" asChild>
                      <a href={doc.url} download target="_blank">
                        Download Document
                      </a>
                    </Button>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* PREVIEW */}
                    <div className="w-full h-[500px] bg-muted rounded-md overflow-hidden flex items-center justify-center">
                      {isImage && (
                        <img
                          src={doc.url}
                          alt={doc.title}
                          className="object-contain w-full h-[500px]"
                        />
                      )}

                      {isPDF && (
                        <iframe
                          src={doc.url}
                          className="w-full h-[500px]"
                          title={doc.title}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <EmptyData text="No documents added yet." />
          )}
        </section>
      </div>
    </AdminPageLayout>
  )
}

export default page