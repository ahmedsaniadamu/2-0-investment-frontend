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

const InvestorProfilePage = () => {

   const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "Ahmed Sani",
      email: "ahmed.sani@example.com",
      phone: "+234 812 345 6789",
      address: "Abuja, Nigeria",
      bankName: "GTBank",
      accountNumber: "0123456789",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      accountNumber: Yup.string().required("Account number is required"),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

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
            <p className="text-gray-400 text-sm">Joined: Jan 2024</p>
          </div>
        </div>
        <div className="w-[200px]">
            <h4>KYC Status</h4>
            <h2 className="text-2xl mb-2 font-semibold text-orange-500">Not Verified</h2>
            <Button className="bg-orange-500">Verify Kyc</Button>
        </div>
        <Button onClick={ () => setOpen(true) } className="mt-4 sm:mt-0 bg-primary text-white">Update Password</Button>
      </div>

      {/* Profile Details Form */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={formik.handleSubmit} className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input {...formik.getFieldProps("fullName")} />
            </div>

            <div>
              <Label>Email</Label>
              <Input {...formik.getFieldProps("email")} type="email" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input {...formik.getFieldProps("phone")} />
            </div>

            <div>
              <Label>Address</Label>
              <Input {...formik.getFieldProps("address")} />
            </div>

            <div>
              <Label>Bank Name</Label>
              <Input {...formik.getFieldProps("bankName")} />
            </div>

            <div>
              <Label>Account Number</Label>
              <Input {...formik.getFieldProps("accountNumber")} />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <Button type="submit" className="bg-primary text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </InvestorPageLayout>
  )
}

export default InvestorProfilePage
