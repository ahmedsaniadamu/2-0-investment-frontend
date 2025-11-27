"use client"
import React, { useState } from "react"
import InvestorPageLayout from "../_components/investor-page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFormik } from "formik"
import * as Yup from "yup"
import UpdatePasswordModal from "./_components/update-password-modal"
import { PenSquareIcon } from "lucide-react"
import { useSessionUserId } from "@/hooks/use-session-user-id"
import { useMutation, useQuery } from "@tanstack/react-query"
import { investorProfile } from "@/api/profile"
import Loader from "@/components/loader"
import { toastMessage } from "@/lib/custom-toast"
import { useRouter } from "next/navigation"
import { SpinnerCustom } from "@/components/ui/spinner"

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
  }

const InvestorProfilePage = () => {

   const [open, setOpen] = useState(false);
   const [edit, setEdit] = useState(false);
   const userId = useSessionUserId();
   const {push} = useRouter();
    const { data: profile, isPending, refetch } = useQuery({
      queryKey: ["investorProfile", userId],
      queryFn: () => investorProfile.getProfileInfo(userId as string),
      select: (data: any) => data,
      enabled: !!userId
    });

    const {mutateAsync: updateProfile, isPending: updatePending} = useMutation({
      mutationFn: investorProfile.updateProfileInfo,
      mutationKey: ["update-profile"],
    })

  const formik = useFormik({
    initialValues: {
      fullName: profile?.investor?.name || "",
      email: profile?.investor?.email || "",
      phone: profile?.investor?.phone_number || "",
      address: profile?.address || "",
      bankName: profile?.bankName || "",
      accountNumber: profile?.accountNumber || "",
      accountName: profile?.accountName || "",
    } as FormData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      accountNumber: Yup.string().required("Account number is required"),
    }),
    onSubmit: async (values) => {
      try{
        await updateProfile({
          id: userId as string,
          data: values
        });
        setEdit(false);
        refetch();
        toastMessage( 'success', 'Success', "Profile updated successfully");
      }catch(err: any){
        toastMessage( 'error', 'Error', err?.response?.data?.message || "Something went wrong");
      }
    },
  })

  if(isPending) return <Loader />

  return (
    <InvestorPageLayout>
      {  open ? 
        <UpdatePasswordModal open={open} onClose={() => setOpen(false)} />
      : null }
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-slate-200">
            <AvatarImage src="/images/user.png" alt="profile" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{formik.values.fullName}</h2>
            <p className="text-gray-500">{formik.values.email}</p>
            <p className="text-gray-400 text-sm">Joined: {new Date(profile?.investor?.createdAt).toDateString()}</p>
          </div>
        </div>
        <div className="w-[200px]">
            <h4>KYC Status</h4>
            {
              profile?.investorKycRequest?.status === "pending" ?
                <h2 className="text-2xl mb-2 font-semibold text-yellow-500">Pending</h2>
              : profile?.investorKycRequest?.status === "approved" ?
                <h2 className="text-2xl mb-2 font-semibold text-green-500">Verified</h2>
              : profile?.investorKycRequest?.status === "rejected" ?
                <h2 className="text-2xl mb-2 font-semibold text-orange-500">Rejected</h2>
              : <h2 className="text-2xl mb-2 font-semibold text-orange-500">Not Verified</h2>
            }
            <Button onClick={ () => {
                sessionStorage.setItem('uploadedDocuments', JSON.stringify(profile?.investorKycRequest?.documents));
                push("/investor/settings/verify-kyc")
            } } className="bg-orange-500">{
              profile?.investorKycRequest?.status === "approved" || profile?.investorKycRequest?.status === "pending"
              || profile?.investorKycRequest?.status === "rejected" ?
                "Update Kyc" : "Verify Kyc"    
            }</Button>
        </div>
        <Button onClick={ () => setOpen(true) } className="mt-4 sm:mt-0 bg-primary text-white">Update Password</Button>
      </div>

      {/* Profile Details Form */}
      <Card>
        <CardContent className="p-6 pt-2 space-y-4">
          <h2 className="text-xl font-semibold flex justify-between">Profile Details
            <Button className="text-sm" style={{opacity: !edit ? 0.5 : 1}} onClick={ () => setEdit(!edit) } asChild size={'icon-sm'}>
               <PenSquareIcon />
            </Button>
          </h2>
          <form onSubmit={formik.handleSubmit} className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input disabled={!edit} {...formik.getFieldProps("fullName")} />
            </div>

            <div>
              <Label>Email</Label>
              <Input disabled {...formik.getFieldProps("email")} type="email" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input disabled={!edit} {...formik.getFieldProps("phone")} />
            </div>

            <div>
              <Label>Address</Label>
              <Input disabled={!edit} {...formik.getFieldProps("address")} />
            </div>

            <div>
              <Label>Bank Name</Label>
              <Input disabled={!edit} {...formik.getFieldProps("bankName")} />
            </div>

            <div>
              <Label>Account Name</Label>
              <Input disabled={!edit} {...formik.getFieldProps("accountName")} />
            </div>

            <div>
              <Label>Account Number</Label>
              <Input disabled={!edit} {...formik.getFieldProps("accountNumber")} />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <Button style={{opacity: !edit ? 0.5 : 1}} disabled={!edit} type="submit" className="bg-primary text-white">
                {
                  updatePending ? <SpinnerCustom /> : 'Save Changes'
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </InvestorPageLayout>
  )
}

export default InvestorProfilePage
