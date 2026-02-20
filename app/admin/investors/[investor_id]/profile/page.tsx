'use client'
import { adminInvestors } from '@/services/investors';
import AdminPageLayout from '@/app/admin/_components/admin-page-layout';
import Loader from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePermission } from '@/hooks/use-permission';
import AccessDeniedFullScreen from '@/app/admin/_components/access-denied';
import { PhoneInput } from "@/components/ui/phone-input"
import { Textarea } from "@/components/ui/textarea"
import { CountryDropdown } from '@/components/ui/country-dropdown';

const Page = () => {
  const { investor_id } = useParams();
  const { hasAccess, loading: permissionLoading } = usePermission("investors", 'view_investors_profile');

  const { data: profile, isPending } = useQuery({
    queryKey: ["investorProfile", investor_id],
    queryFn: () => adminInvestors.getInvestorProfile(investor_id as string),
    enabled: !!investor_id && hasAccess,
  });

  if (permissionLoading || isPending) return <Loader />;

  if (!hasAccess) return <AccessDeniedFullScreen />;

  const investor = profile?.investor;

  const data = {
    fullName: investor?.name || "",
    email: investor?.email || "",
    phone: investor?.phone_number || "",
    address: profile?.address || "",
    country: profile?.country || "",
    bankName: profile?.bankName || "",
    accountNumber: profile?.accountNumber || "",
    accountName: profile?.accountName || "",
    joinedDate: investor?.createdAt ? new Date(investor.createdAt).toDateString() : "",
    kycStatus: profile?.investorKycRequest?.status || "pending",
    stripeAccountId: profile?.stripeAccountId || "",
    accountStatus: profile?.accountStatus || ""
  };

  return (
    <AdminPageLayout>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-semibold">Investor Profile</h1>
        <Button
          variant="outline"
          className="bg-white"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </header>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-white p-6 rounded-xl shadow">
        <div className="md:flex max-[500px]:w-full items-center gap-4">
          <Avatar className="h-[150px] w-[150px] md:h-16 md:w-16 border-2 border-slate-200">
            <AvatarImage src="/images/user.png" alt="profile" />
            <AvatarFallback>
              {data.fullName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{data.fullName}</h2>
            <p className="text-gray-500">{data.email}</p>
            <p className="text-gray-400 text-sm">Joined: {data.joinedDate}</p>
          </div>
        </div>
        <div className="w-full md:w-[200px]">
          <h4 className="text-sm font-medium">KYC Status</h4>
          {
            data.kycStatus === "pending" ?
              <h2 className="text-2xl mb-2 font-semibold text-yellow-500">Pending</h2>
              : data.kycStatus === "approved" ?
                <h2 className="text-2xl mb-2 font-semibold text-green-500">Verified</h2>
                : data.kycStatus === "rejected" ?
                  <h2 className="text-2xl mb-2 font-semibold text-orange-500">Rejected</h2>
                  : <h2 className="text-2xl mb-2 font-semibold text-orange-500">Not Verified</h2>
          }
        </div>
      </div>
      <Card>
        <CardContent className="p-6 pt-6 space-y-4">
          <h2 className="text-xl font-semibold mb-6">Profile Details</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input disabled value={data.fullName} className="bg-slate-50" />
            </div>

            <div>
              <Label>Email</Label>
              <Input disabled value={data.email} className="bg-slate-50" />
            </div>

            <div>
              <Label>Phone</Label>
              <PhoneInput
                defaultCountry="NG"
                disabled
                value={data.phone}
              />
            </div>

            <div>
              <Label>Country</Label>
              <CountryDropdown
                disabled
                defaultValue={data.country}
              />
            </div>

            <div className="col-span-2">
              <Label>Address</Label>
              <Textarea disabled value={data.address} className="bg-slate-50" />
            </div>

            <div className="py-5 text-sm font-bold col-span-2 bg-yellow-100 rounded-lg p-4">
              Note: bank details is auto generated and can't be edited.
              This account number is for receiving funds.
              The investor requires payment provider onboarding for withdrawals.
            </div>

            <div>
              <Label>Connected Account Id</Label>
              <Input disabled value={data.stripeAccountId} className="bg-slate-50" />
            </div>

            <div>
              <Label>Connected Account Status</Label>
              <Input
                disabled
                value={data.accountStatus}
                className={`bg-slate-50 ${data.accountStatus === "active" ? "text-green-500" : "text-orange-500"}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default Page;

