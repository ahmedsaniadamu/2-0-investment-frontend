'use client'
import { adminInvestors } from '@/api/investors';
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

const formatJoinedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const Page = () => {

  const { investor_id } = useParams();

  const { data: profile, isPending } = useQuery({
    queryKey: ["investorProfile", investor_id],
    queryFn: () => adminInvestors.getInvestorProfile(investor_id as string),
    enabled: !!investor_id,
  });

  if (isPending) return <Loader />;

  const investor = profile?.investor;

  const data = {
    fullName: investor?.name || "",
    email: investor?.email || "",
    phone: investor?.phone_number || "",
    address: profile?.address || "",
    bankName: profile?.bankName || "",
    accountNumber: profile?.accountNumber || "",
    joinedDate: investor?.createdAt ? formatJoinedDate(investor.createdAt) : "",
    kycStatus: profile?.investorKycRequest?.status || "pending",
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
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-slate-200">
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

        <div className="w-[200px]">
          <h4 className="text-sm font-medium">KYC Status</h4>
          <h2 className="text-2xl font-semibold text-orange-500 capitalize">
            {data.kycStatus}
          </h2>
        </div>
      </div>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-6">

            <div>
              <Label>Full Name</Label>
              <Input value={data.fullName} disabled className="bg-slate-100" />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={data.email} disabled className="bg-slate-100" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input value={data.phone} disabled className="bg-slate-100" />
            </div>

            <div>
              <Label>Address</Label>
              <Input value={data.address} disabled className="bg-slate-100" />
            </div>

            <div>
              <Label>Bank Name</Label>
              <Input value={data.bankName} disabled className="bg-slate-100" />
            </div>

            <div>
              <Label>Account Number</Label>
              <Input
                value={data.accountNumber}
                disabled
                className="bg-slate-100"
              />
            </div>

          </div>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default Page;
