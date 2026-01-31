'use client'

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InvestorPageLayout from '../../_components/investor-page-layout';
import Loader from "@/components/loader";
import { toastMessage } from "@/lib/custom-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { investorInvestments } from "@/services/investment";
import { sharedPlans } from "@/services/plan";
import { useRouter, useSearchParams } from "next/navigation";
import { SpinnerCustom } from "@/components/ui/spinner";
import { format, addMonths } from "date-fns";
import { formatNumberWithCommas } from "@/lib/format-number";
import InvestmentCheckout from '../_components/payment-checkout';
import { useSessionUserId } from "@/hooks/use-session-user-id";
import { investorProfile } from "@/services/profile";
import UpdateProfile from "./_components/update-profile";

// Validation schemas
const investmentDetailsSchema = (minDeposit: number) => Yup.object().shape({
    amount: Yup.number()
        .min(minDeposit, `Minimum investment is $${formatNumberWithCommas(minDeposit)}`)
        .required("Amount is required"),
    paymentMethod: Yup.string().required("Select a payment method"),
    startDate: Yup.date().nullable().required("Select a start date"),
    investmentGoal: Yup.string()
        .min(5, "Goal must be at least 5 characters")
        .required("Please describe your investment goal"),
    agreement: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

export default function InvestmentFlow() {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState<any>(null);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const userId = useSessionUserId();
    const router = useRouter();
    const searchParams = useSearchParams();
    const planId = searchParams.get("planId");

    const { data: availablePlans, isPending: plansPending } = useQuery({
        queryKey: ["get-plans"],
        queryFn: () => sharedPlans.getPlans(),
    });

    const { data: profileStatus, isPending: profileStatusPending } = useQuery({
        queryKey: ["check-profile-status", userId],
        queryFn: () => investorProfile.checkProfileStatus(userId as string),
        enabled: !!userId,
    });

    useEffect(() => {
        if (profileStatus && profileStatus?.exists === false) {
            setShowUpdateProfile(true);
        }
    }, [profileStatus]);


    const activePlan = availablePlans?.find((p: any) => p.id === planId);

    const { mutateAsync: initiateInvestment } = useMutation({
        mutationFn: investorInvestments.initiateInvestment,
        mutationKey: ["initiate-investment"],
    });

    const { mutateAsync: createPaymentIntent } = useMutation({
        mutationFn: investorInvestments.createPaymentIntent,
        mutationKey: ["create-payment-intent"],
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    const handleInvestmentSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (values.paymentMethod === 'stripe') {
                const response = await createPaymentIntent({
                    amount: values.amount,
                    currency: "usd",
                    investorId: userId as string,
                    planId: planId as string,
                    startDate: values.startDate,
                    investmentGoal: values.investmentGoal,
                    agreement: values.agreement,
                    paymentMethod: values.paymentMethod,
                });
                setPaymentData({ ...response, ...values });
                setCurrentStep(2);
            }
        } catch (error: any) {
            if (error?.response?.data?.message === "Profile not found") {
                setShowUpdateProfile(true);
            }
            toastMessage('error', 'Error', error?.response?.data?.message || 'Failed to initiate investment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (plansPending) return <Loader />;
    if (!activePlan) return <div className="p-10 text-center">Plan not found or invalid plan ID.</div>;

    const progressPercentage = (currentStep / 2) * 100;

    return (
        <InvestorPageLayout>
            <UpdateProfile open={showUpdateProfile} onClose={() => setShowUpdateProfile(false)} />
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Complete Your Investment</CardTitle>
                        <div className="mt-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Progress</span>
                                <span className="text-sm font-medium">{progressPercentage}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Step Indicator */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 1
                                        ? "bg-primary text-white"
                                        : "bg-green-500 text-white"
                                        }`}
                                >
                                    1
                                </div>
                                <div className="ml-3 text-left">
                                    <div className="text-sm font-semibold">Step 1</div>
                                    <div className="text-xs text-gray-600">Investment Details</div>
                                </div>
                            </div>

                            <div className="w-32 h-1 bg-gray-300 mx-4"></div>

                            <div className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 2
                                        ? "bg-primary text-white"
                                        : "bg-gray-300 text-gray-600"
                                        }`}
                                >
                                    2
                                </div>
                                <div className="ml-3 text-left">
                                    <div className="text-sm font-semibold">Step 2</div>
                                    <div className="text-xs text-gray-600">Payment</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 1: Investment Details */}
                        {currentStep === 1 && (
                            <Formik
                                initialValues={{
                                    amount: "",
                                    paymentMethod: "stripe",
                                    startDate: "",
                                    investmentGoal: "",
                                    agreement: false,
                                }}
                                validationSchema={investmentDetailsSchema(parseFloat(activePlan.minDeposit))}
                                onSubmit={handleInvestmentSubmit}
                            >
                                {({ errors, touched, setFieldValue, values }) => {
                                    const withdrawalDate = values.startDate ? format(addMonths(new Date(values.startDate), 12), "PPP") : null;

                                    return (
                                        <Form className="space-y-6">
                                            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                                                <h3 className="font-semibold text-blue-800 mb-1">Plan: {activePlan.name}</h3>
                                                <p className="text-sm text-blue-600">ROI: {activePlan.roi} | Range: ${formatNumberWithCommas(activePlan.minDeposit)} - ${formatNumberWithCommas(activePlan.maxDeposit)}</p>
                                            </div>

                                            <div>
                                                <Label htmlFor="amount">
                                                    Amount ($) <span className="text-red-500">*</span>
                                                </Label>
                                                <Field
                                                    as={Input}
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    placeholder="Enter amount"
                                                    className={errors.amount && touched.amount ? "border-red-500" : ""}
                                                />
                                                <ErrorMessage
                                                    name="amount"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="paymentMethod">
                                                    Payment Method <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setFieldValue("paymentMethod", value)}
                                                    defaultValue={values.paymentMethod}
                                                    value="stripe" disabled
                                                >
                                                    <SelectTrigger className={errors.paymentMethod && touched.paymentMethod ? "border-red-500 w-full" : "w-full"}>
                                                        <SelectValue placeholder="Select method" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="wallet">Wallet</SelectItem>
                                                        <SelectItem value="bank">Bank Transfer</SelectItem>
                                                        <SelectItem value="stripe">(Stripe)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <ErrorMessage
                                                    name="paymentMethod"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="startDate">
                                                    Start Date <span className="text-red-500">*</span>
                                                </Label>
                                                <Field
                                                    as={Input}
                                                    id="startDate"
                                                    name="startDate"
                                                    type="date"
                                                    min={format(new Date(), "yyyy-MM-dd")}
                                                    className={errors.startDate && touched.startDate ? "border-red-500" : ""}
                                                />
                                                <ErrorMessage
                                                    name="startDate"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                                {withdrawalDate && (
                                                    <div className="mt-2 text-sm text-gray-600 italic">
                                                        Expected Withdrawal Date: <span className="font-semibold">{withdrawalDate}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="investmentGoal">
                                                    Investment Goal <span className="text-red-500">*</span>
                                                </Label>
                                                <Field
                                                    as={Input}
                                                    id="investmentGoal"
                                                    name="investmentGoal"
                                                    placeholder="E.g., Save for property, earn steady ROI..."
                                                    className={errors.investmentGoal && touched.investmentGoal ? "border-red-500" : ""}
                                                />
                                                <ErrorMessage
                                                    name="investmentGoal"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>

                                            <div className="flex items-start space-x-2">
                                                <Checkbox
                                                    id="agreement"
                                                    checked={values.agreement}
                                                    onCheckedChange={(checked) => setFieldValue("agreement", checked)}
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <Label
                                                        htmlFor="agreement"
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        I agree to the terms and risk disclaimer
                                                    </Label>
                                                    <ErrorMessage
                                                        name="agreement"
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-4">
                                                <Button type="submit" className="bg-primary hover:bg-orange-600 px-16" disabled={loading}>
                                                    {loading ? <SpinnerCustom /> : "Proceed to Payment"}
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        )}

                        {/* Step 2: Payment */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-semibold">Complete Your Payment</h3>
                                    <p className="text-sm text-gray-600">Total Amount: <span className="font-bold text-primary">${formatNumberWithCommas(paymentData?.amount)}</span></p>
                                </div>

                                {paymentData?.clientSecret ? (
                                    <div className='w-full border-2 border-dotted border-primary bg-white p-6 rounded-lg'>
                                        <InvestmentCheckout clientSecret={paymentData.clientSecret} amount={paymentData.amount} />
                                    </div>
                                ) : (
                                    <div className="text-center p-6 border rounded-lg bg-gray-50">
                                        <p className="text-red-500">Failed to initialize payment gateway. Please try again.</p>
                                        <Button
                                            variant="outline"
                                            className="mt-4"
                                            onClick={() => setCurrentStep(1)}
                                        >
                                            Go Back
                                        </Button>
                                    </div>
                                )}

                                <div className="flex justify-start">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setCurrentStep(1)}
                                        className="text-gray-500"
                                    >
                                        Back to Details
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </InvestorPageLayout>
    );
}