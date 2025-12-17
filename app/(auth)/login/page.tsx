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
import { auth } from "@/api/auth";
import { toastMessage } from "@/lib/custom-toast";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react"; // 👁️ Import icons
import { hashSync } from "bcryptjs";
import { adminModules } from "@/app/admin/_components/admin-page-layout";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
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
  return { label: "Strong", color: "bg-green-600", width: "w-full" };
};


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: auth.login,
    mutationKey: ["login"],
  });

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        const res = await login({ email: values.email, password: values.password });
        if(res?.user?.isVerified === false){
            toastMessage("error", "Error", "Please verify your email");
           return push(`/verify-otp?email=${values.email}&from=login&id=${res?.user?.id}`);
        }
        toastMessage("success", "Success", res?.message);
        sessionStorage.setItem("token", res?.token);
        sessionStorage.setItem("user", JSON.stringify(res?.user));
        sessionStorage.setItem("role", 
          hashSync(res?.user?.role, 10)
        );
        if(res?.user?.role === "admin" || res?.user?.role === "sub-admin"){
          if(res?.user?.role === "sub-admin"){
            const allowedModules = new Set(res?.user?.permissions?.map((p: any) => p?.module));
            const availableModules = adminModules.filter(module => allowedModules.has(module.slug))
            if(availableModules.length > 0){
              push(`${availableModules[0].url}`);
            }
            else{
              toastMessage("error", "Error", "You don't have access to any of the admin modules");
            }
          } else push("/admin");
        }
        else push("/investor");
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
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue investing</CardDescription>
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

              <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 pr-10"
                    : "pr-10"
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
      </div>
                {formik.values.password && (
                  <div className="space-y-1 pt-3">
                    <div className="h-2 w-full mt-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrength(formik.values.password).color} ${getPasswordStrength(formik.values.password).width}`}
                      ></div>
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        getPasswordStrength(formik.values.password).color.replace("bg-", "text-")
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
              {/* Submit Button */}
              <Button type="submit" className="w-full">
                {isPending ? <SpinnerCustom /> : "Sign In"}
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

        <p className="mt-3 text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href="#" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
          </section>
    </div>
  );
}
