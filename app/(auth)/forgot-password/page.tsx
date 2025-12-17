"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/services/auth";
import { toastMessage } from "@/lib/custom-toast";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react"; // 👁️ Import icons

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});


export default function LoginPage() {
   
  const { push } = useRouter();

  const { mutateAsync: forgotPassword, isPending } = useMutation({
    mutationFn: auth.forgotPassword,
    mutationKey: ["verify-otp"],
  });

  const formik: any = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        const res = await forgotPassword({ email: values.email });
        toastMessage("success", "Success", res?.message);
        push(`/verify-otp?email=${values.email}&from=forgot-password&id=${res?.user?.id}`);
      } catch (error: any) {
        toastMessage("error", "Error", error?.response?.data?.message);
      }
    },
  });

  return (
    <div className="sm:grid grid-cols-2 h-screen overflow-y-hidden bg-white">
          {/* Left section with logo */}
          <section className="bg-primary max-[500px]:hidden h-screen flex justify-center items-center">
            <div className="mb-0 bg-white rounded-2xl text-center">
              <div className="mb-0 text-center">
                <Link href="/" className="inline-flex items-center gap-2">
                  <Image className="w-[290px] h-[130px]" src={logo} alt="2Zero Investment" />
                </Link>
              </div>
            </div>
          </section>
          <section className="flex justify-center">
                 <div className="w-full max-w-md ">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex justify-end">
                <Link href="/" className="inline-flex text-primary font-semibold items-center gap-2">
                  <ArrowLeft /> Back
                </Link>
              </div>
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>Use your email address to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email && formik.errors.email ? "border-red-500" : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>
              {/* Submit Button */}
              <Button type="submit" className="w-full">
                {isPending ? <SpinnerCustom /> : "Submit"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
          </section>
    </div>
  );
}
