"use client";
import Link from "next/link";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import { auth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toastMessage } from "@/lib/custom-toast";
import { SpinnerCustom } from "@/components/ui/spinner";

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

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,}$/, "Phone number must be at least 10 digits"),
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
  terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

export default function SignupPage() {
 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const { push } = useRouter();
  
    const { mutateAsync: register, isPending } = useMutation({
      mutationFn: auth.register,
      mutationKey: ["register"],
    });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async(values) => {
       try {
        const res = await register({
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          phone_number: values.phone,
          password: values.password,
          role: "investor",
        });
        toastMessage("success", "Success", res?.message);
        push(`/verify-otp?email=${values.email}&from=signup&id=${res?.user?.id}`);
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

      {/* Signup form section */}
      <section className="h-screen overflow-y-auto w-full flex justify-center">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <div className="flex justify-end">
                <Link href="/" className="inline-flex text-primary font-semibold items-center gap-2">
                  <ArrowLeft /> Back
                </Link>
              </div>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Start your investment journey today</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* First & Last Name */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-sm text-red-500">{formik.errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-sm text-red-500">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-sm text-red-500">{formik.errors.phone}</p>
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

                {/* Terms checkbox */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    name="terms"
                    checked={formik.values.terms}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("terms", checked)
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {formik.touched.terms && formik.errors.terms && (
                  <p className="text-sm text-red-500">{formik.errors.terms}</p>
                )}

                <Button disabled={isPending} style={{ opacity: isPending ? 0.5 : 1 }} type="submit" className="w-full">
                   {
                     isPending ? <SpinnerCustom /> : 'Create Account'
                   }
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
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
