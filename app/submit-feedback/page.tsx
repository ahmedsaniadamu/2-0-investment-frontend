"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Send, CheckCircle2, MessageSquareQuote } from "lucide-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { feedbackService } from "@/services/feedback"
import { toastMessage } from "@/lib/custom-toast"
import DecorativeSection from "@/components/decorative-section"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const validationSchema = Yup.object({
    investorId: Yup.string().required("Investor ID is required"),
    rating: Yup.number().min(0.5, "Please rate your experience").max(5).required("Rating is required"),
    comment: Yup.string().min(10, "Tell us a bit more (minimum 10 characters)").required("Feedback comment is required"),
})

export default function SubmitFeedbackPage() {

    const [isSuccess, setIsSuccess] = useState(false)
    const searchParams = useSearchParams()
    const investorId = searchParams.get("investorId")

    const formik = useFormik({
        initialValues: {
            investorId: investorId || "",
            rating: 0,
            comment: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await feedbackService.submitFeedback(values)
                toastMessage("success", "Thank you for your valuable feedback!")
                setIsSuccess(true)
            } catch (error: any) {
                toastMessage("error", error?.response?.data?.message || "Something went wrong. Please try again.")
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
        <div className="flex flex-col min-h-screen bg-[#f8faff]">
            <Header isTransaprent={false} hasSpacing={false} />

            <main className="flex-grow">
                {/* Modern Hero Section with animated gradients */}
                <section className="relative overflow-hidden bg-primary pt-16 pb-24 lg:pt-24 lg:pb-32">
                    {/* Animated Background Elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    >
                        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
                    </motion.div>

                    <div className="container relative z-10 mx-auto px-4 text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                                Investor Relations
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                Your <span className="text-white">Growth</span>, Our Priority.
                            </h1>
                            <p className="max-w-2xl mx-auto text-lg text-white/80 leading-relaxed">
                                We are committed to providing the ultimate investment experience.
                                Share your thoughts and help us shape the future of wealth management.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="relative z-20 -mt-16 pb-24">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <AnimatePresence mode="wait">
                            {!isSuccess ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[2.5rem] overflow-hidden bg-white/95 backdrop-blur-xl">
                                        <CardHeader className="pt-10 px-8 pb-4 text-center">
                                            <div className="mx-auto w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-4 text-primary">
                                                <MessageSquareQuote className="w-8 h-8" />
                                            </div>
                                            <CardTitle className="text-3xl font-bold text-slate-900">Share Your Experience</CardTitle>
                                            <CardDescription className="text-base mt-2">
                                                How would you rate our platform and services?
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="p-8 md:p-12 ">
                                            <form onSubmit={formik.handleSubmit} className="space-y-3">
                                                {/* Interactive Star Rating Component */}
                                                <div className="space-y-4 text-center md:-mt-12">
                                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-500">Overall Rating</Label>
                                                    <div className="flex justify-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((starIdx) => (
                                                            <div key={starIdx} className="relative w-12 h-12">
                                                                {/* Left half (0.5) */}
                                                                <div
                                                                    className="absolute inset-y-0 left-0 w-1/2 z-10 cursor-pointer"
                                                                    onClick={() => formik.setFieldValue("rating", starIdx - 0.5)}
                                                                />
                                                                {/* Right half (1.0) */}
                                                                <div
                                                                    className="absolute inset-y-0 right-0 w-1/2 z-10 cursor-pointer"
                                                                    onClick={() => formik.setFieldValue("rating", starIdx)}
                                                                />

                                                                {/* Visual Star */}
                                                                <div className="relative">
                                                                    <Star size={44} className="text-slate-200" />
                                                                    <div
                                                                        className="absolute top-0 left-0 overflow-hidden pointer-events-none transition-all duration-300"
                                                                        style={{
                                                                            width: formik.values.rating >= starIdx
                                                                                ? '100%'
                                                                                : formik.values.rating >= starIdx - 0.5
                                                                                    ? '50%'
                                                                                    : '0%'
                                                                        }}
                                                                    >
                                                                        <Star size={44} className="fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {formik.touched.rating && formik.errors.rating && (
                                                        <p className="text-sm font-medium text-red-500 animate-bounce">{formik.errors.rating}</p>
                                                    )}
                                                    {formik.values.rating > 0 && (
                                                        <motion.p
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="text-lg font-bold text-primary"
                                                        >
                                                            {formik.values.rating} / 5
                                                        </motion.p>
                                                    )}
                                                </div>

                                                {/* Comment area */}
                                                <div className="space-y-3">
                                                    <Label htmlFor="comment" className="text-sm font-bold text-slate-700 ml-1">Your Detailed Feedback</Label>
                                                    <div className="relative">
                                                        <Textarea
                                                            id="comment"
                                                            name="comment"
                                                            placeholder="Tell us about the investment process or any suggestions you have..."
                                                            rows={5}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.comment}
                                                            className={`resize-none px-6 py-8 rounded-3xl bg-slate-50 border-slate-100 transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-800 placeholder:text-slate-400 ${formik.touched.comment && formik.errors.comment ? "border-red-200 ring-red-50/50" : ""
                                                                }`}
                                                        />
                                                        <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                                                            Quality Feedback Matters
                                                        </div>
                                                    </div>
                                                    {formik.touched.comment && formik.errors.comment && (
                                                        <p className="text-xs font-semibold text-red-500 ml-2">{formik.errors.comment}</p>
                                                    )}
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={formik.isSubmitting}
                                                    className="w-full h-12 mt-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 group"
                                                >
                                                    {formik.isSubmitting ? (
                                                        <div className="flex items-center gap-3">
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                            />
                                                            Processing...
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-center gap-2">
                                                            Submit Feedback
                                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </div>
                                                    )}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center space-y-8"
                                >
                                    <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                        <CheckCircle2 strokeWidth={1.5} size={48} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold text-slate-900">Feedback Received!</h2>
                                        <p className="text-slate-500 max-w-xs mx-auto">
                                            Thank you for helping us grow. We value every word you share with us.
                                        </p>
                                    </div>
                                    <Link
                                        href="/"
                                        className="rounded-xl py-4 px-8 bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 group"
                                    >
                                        Back to Home
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Bottom decorative section */}
                <DecorativeSection />
            </main>

            <Footer />
        </div>
    )
}