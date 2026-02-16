"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toastMessage } from "@/lib/custom-toast";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  if (strength <= 2) return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
  if (strength === 3 || strength === 4)
    return { label: "Medium", color: "bg-yellow-500", width: "w-2/3" };
  return { label: "Strong", color: "bg-green-500", width: "w-full" };
};

export default function ResetPassword() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: resetPassword, isPending } = useMutation({
    mutationFn: auth.resetPassword,
    mutationKey: ["reset-password"],
  });

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        const res = await resetPassword({
          newPassword: values.password,
          email: values.email
        });
        toastMessage('success', "Success", res?.message || "Password reset successfully");
        sessionStorage.setItem("token", res?.token);
        sessionStorage.setItem("user", JSON.stringify(res?.user));
        push("/investor");
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

  return (
    <div className="sm:grid grid-cols-2 h-screen overflow-y-hidden bg-white">
      {/* Left section with logo */}
      <section className="bg-primary max-[500px]:hidden h-screen flex justify-center items-center">
        <div className="mb-0 bg-white rounded-2xl text-center">
          <div className="mb-0 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image className="w-[120px] h-[120px]" src={logo} alt="2Zero Investment" />
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
                <Button onClick={() => window.history.back()} className="inline-flex bg-transparent text-primary font-semibold items-center gap-2">
                  <ArrowLeft /> Back
                </Button>
              </div>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>Reset your password to access your account</CardDescription>
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
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Password strength bar */}
                  {formik.values.password && (
                    <div className="pt-2 space-y-1 mt-1">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getPasswordStrength(formik.values.password).color} ${getPasswordStrength(formik.values.password).width}`}
                        ></div>
                      </div>
                      <p
                        className={`text-sm font-medium ${getPasswordStrength(formik.values.password).color.replace("bg-", "text-")
                          }`}
                      >
                        {getPasswordStrength(formik.values.password).label} password
                      </p>
                    </div>
                  )}

                  {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">{formik.errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? <SpinnerCustom /> : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
