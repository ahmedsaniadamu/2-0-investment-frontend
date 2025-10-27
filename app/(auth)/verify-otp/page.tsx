"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toastMessage } from "@/lib/custom-toast";
import { SpinnerCustom } from "@/components/ui/spinner";
import {
InputOTP,
InputOTPGroup,
InputOTPSeparator,
InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect } from "react";

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        otp: Yup.string()
        .required("OTP is required")
        .matches(/^[A-Za-z0-9]{6}$/, "OTP must be 6 characters: letters or numbers"),
    });

export default function VerifyOTP() {
    const { push } = useRouter();
    const searchParams = useSearchParams(); 
    
    const { mutateAsync: verifyOtp, isPending } = useMutation({
    mutationFn: auth.veryfyOtp,  
    mutationKey: ["verify-otp"],
    });

     const { mutateAsync: resendOtp_, isPending: resendPending } = useMutation({
    mutationFn: auth.resendOtp,  
    mutationKey: ["resend-otp"],
    });

   const formik: any = useFormik({
        initialValues: {
           email: "",
            otp: "",
        },
       validationSchema,
    onSubmit: async (values: any) => {
        try {
            if(!searchParams.get("id")) return toastMessage("error", "Error", "Invalid link");
            const res = await verifyOtp({otp: values.otp, investorId: searchParams.get("id") as string,
                type: searchParams.get("from") as string
            });
            toastMessage('success', "Verified", res?.message || "OTP verified successfully");
             if(searchParams.get("from") === "signup" ||  searchParams.get("from") === "login"){
                sessionStorage.setItem("token", res?.token);
                sessionStorage.setItem("user", JSON.stringify(res?.user));
                push("/investor");
             }
             else{
                push(`reset-password?email=${values.email}`);
             }
        } catch (error: any) {
            toastMessage("error", "Error", error?.response?.data?.message || "Verification failed");
        }
    },
});

    useEffect(() => {
        if (searchParams.get("email")) {
            formik.setFieldValue("email", searchParams.get("email"));
        }
    }, [])

 const resendOtp = async () => {
    try {
        const res = await resendOtp_({email: formik.values.email});
        toastMessage("success", "Success", res?.message);
    } catch (error: any) {
        toastMessage("error", "Error", error?.response?.data?.message);
    }
}

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
  {/* OTP Verification Form */}
  <section className="h-screen overflow-y-auto w-full flex justify-center">
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <div className="flex justify-end">
            <Button onClick={ () => window.history.back() } className="inline-flex bg-transparent text-primary font-semibold items-center gap-2">
              <ArrowLeft /> Back
            </Button>
          </div>
          <CardTitle className="text-2xl">Verify OTP</CardTitle>
          <CardDescription>Enter the code sent to your email address</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                disabled={searchParams.get("email") ? true : false}
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-4"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* OTP Field */}
            <div className="space-y-2">
              <Label>OTP *</Label>
              <div className="flex justify-left">
                <InputOTP
                  maxLength={6}
                  value={formik.values.otp}
                  onChange={(val) => formik.setFieldValue("otp", val)}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <><InputOTPSlot key={index} className="h-12 w-12 rounded-none" index={index} /> { index < 5 && <span className="text-xl px-1">-</span>} </>
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {formik.touched.otp && formik.errors.otp && (
                <p className="text-sm text-red-500 ">{formik.errors.otp}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? <SpinnerCustom /> : "Verify OTP"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <p className="text-center text-sm text-muted-foreground">
            Didn’t receive the code?{" "}
            <button
              type="button"
              disabled={resendPending}
              onClick={resendOtp}
              className="text-primary font-medium hover:underline"
            >
              {resendPending ? <SpinnerCustom /> : "Resend OTP"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  </section>
</div>
);
}
