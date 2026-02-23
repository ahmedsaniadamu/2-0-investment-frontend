"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, Linkedin, Twitter, Facebook, Instagram, Globe } from "lucide-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "sonner"

const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().min(10, "Message should be at least 10 characters").required("Message is required"),
})

export default function ContactPage() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500))
                console.log("Form values:", values)
                toast.success("Message sent successfully! We'll get back to you soon.")
                resetForm()
            } catch (error) {
                toast.error("Something went wrong. Please try again.")
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
        <div className="flex flex-col min-h-screen bg-[#f8faff]">
            <main className="flex-grow">
                {/* Interactive Hero Section */}
                <section className="relative border-b bg-gradient-to-br from-primary via-background to-blue-500 pt-0 pb-24  overflow-hidden">
                    <Header isTransaprent={false} hasSpacing />
                    {/* Background Decorative Elements */}
                    <motion.div
                        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-white backdrop-blur-md rounded-full border border-white/20">
                                    Connect With Us
                                </span>
                                <h1 className="text-5xl md:text-7xl text-primary font-bold mb-6 tracking-tight">
                                    Let&apos;s build your <span className="text-primary">future</span> together.
                                </h1>
                                <p className="text-lg text-black leading-relaxed max-w-2xl">
                                    Whether you have questions about our investment strategies or need technical support,
                                    our professional team is dedicated to providing you with the best experience.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Form and Info Section */}
                <section className="py-24 relative -mt-10 lg:-mt-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                            {/* Contact Information Sidebar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-5 space-y-8"
                            >
                                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                                    <h2 className="text-2xl font-bold mb-8 text-primary">Contact Details</h2>

                                    <div className="space-y-8">
                                        <div className="group flex items-start gap-5">
                                            <div className="mt-1 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Us</p>
                                                <a href="mailto:support@2zeroinvestment.com" className="text-sm font-medium hover:text-primary transition-colors block">support@2zeroinvestment.com</a>
                                                <a href="mailto:info@2zeroinvestment.com" className="text-sm font-medium hover:text-primary transition-colors">info@2zeroinvestment.com</a>
                                            </div>
                                        </div>

                                        <div className="group flex items-start gap-5">
                                            <div className="mt-1 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Call Us</p>
                                                <a href="tel:+1234567890" className="text-sm font-medium hover:text-primary transition-colors">+1 (234) 567-890</a>
                                                <p className="text-sm text-slate-400 mt-1">Mon-Fri from 9am to 6pm</p>
                                            </div>
                                        </div>

                                        <div className="group flex items-start gap-5">
                                            <div className="mt-1 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Visit Us</p>
                                                <p className="text-sm font-medium leading-snug">
                                                    123 Financial District, Suite 500<br />
                                                    New York, NY 10004
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                {/* Newsletter or simple card */}
                                <div className="bg-primary p-8 rounded-3xl text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                        <Globe className="w-24 h-24" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 relative z-10">Global Support</h3>
                                    <p className="text-white/70 text-sm relative z-10 leading-relaxed">
                                        Our platform operates globally. No matter where you are, our investment experts are just a message away.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Main Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-7"
                            >
                                <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-none rounded-3xl overflow-hidden">
                                    <div className="h-2 bg-primary w-full" />
                                    <CardHeader className="pt-5 px-8 pb-4">
                                        <CardTitle className="text-3xl font-bold">Send a Message</CardTitle>
                                        <CardDescription className="text-sm mt-2">
                                            Have a specific inquiry? Fill the form below and we&apos;ll get back to you within 24 hours.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <form onSubmit={formik.handleSubmit} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">Full Name</Label>
                                                    <div className="relative group">
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            placeholder="Your full name."
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.name}
                                                            className={`h-14 px-5 rounded-2xl bg-slate-50 border-slate-200 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-primary/20 ${formik.touched.name && formik.errors.name ? "border-destructive focus:ring-destructive/20" : "group-hover:border-slate-300"
                                                                }`}
                                                        />
                                                        {formik.touched.name && formik.errors.name && (
                                                            <p className="text-xs font-medium text-destructive mt-1.5 ml-1">{formik.errors.name}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email Address</Label>
                                                    <div className="relative group">
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            placeholder="Your email address"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.email}
                                                            className={`h-14 px-5 rounded-2xl bg-slate-50 border-slate-200 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-primary/20 ${formik.touched.email && formik.errors.email ? "border-destructive focus:ring-destructive/20" : "group-hover:border-slate-300"
                                                                }`}
                                                        />
                                                        {formik.touched.email && formik.errors.email && (
                                                            <p className="text-xs font-medium text-destructive mt-1.5 ml-1">{formik.errors.email}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2.5">
                                                <Label htmlFor="subject" className="text-sm font-semibold text-slate-700 ml-1">Subject</Label>
                                                <div className="relative group">
                                                    <Input
                                                        id="subject"
                                                        name="subject"
                                                        placeholder="Your subject/issue title"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.subject}
                                                        className={`h-14 px-5 rounded-2xl bg-slate-50 border-slate-200 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-primary/20 ${formik.touched.subject && formik.errors.subject ? "border-destructive focus:ring-destructive/20" : "group-hover:border-slate-300"
                                                            }`}
                                                    />
                                                    {formik.touched.subject && formik.errors.subject && (
                                                        <p className="text-xs font-medium text-destructive mt-1.5 ml-1">{formik.errors.subject}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2.5">
                                                <Label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">Message</Label>
                                                <div className="relative group">
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        placeholder="Please describe your inquiry in detail..."
                                                        rows={6}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.message}
                                                        className={`px-5 py-4 rounded-2xl bg-slate-50 border-slate-200 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-primary/20  ${formik.touched.message && formik.errors.message ? "border-destructive focus:ring-destructive/20" : "group-hover:border-slate-300"
                                                            }`}
                                                    />
                                                    {formik.touched.message && formik.errors.message && (
                                                        <p className="text-xs font-medium text-destructive mt-1.5 ml-1">{formik.errors.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                size="lg"
                                                disabled={formik.isSubmitting}
                                                className="w-full md:w-64 h-14 text-sm font-bold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-200"
                                            >
                                                {formik.isSubmitting ? (
                                                    <span className="flex items-center gap-2">
                                                        <motion.span
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                        />
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="ml-2 w-5 h-5" />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* FAQ CTA Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                            <p className="text-sm text-slate-600 mb-10">
                                You might find what you&apos;re looking for in our FAQ section. We&apos;ve answered the most common
                                questions about our investment plans, security, and withdrawals.
                            </p>
                            <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 text-sm font-semibold" asChild>
                                <a href="/faq">View FAQs</a>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
