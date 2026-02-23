"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import {
    Target,
    Eye,
    ShieldCheck,
    TrendingUp,
    Zap,
    Globe,
    Lock,
    ArrowRight,
    ChevronRight
} from "lucide-react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

const values = [
    {
        icon: ShieldCheck,
        title: "Unwavering Security",
        description: "We partner with industry leaders like Stripe to ensure your capital and data are protected by bank-level encryption and compliance standards."
    },
    {
        icon: Zap,
        title: "Technological Excellence",
        description: "Our platform leverages cutting-edge automation to calculate ROI, manage accounts, and execute transfers with surgical precision."
    },
    {
        icon: Globe,
        title: "Global Accessibility",
        description: "Breaking down geographical barriers, we provide a unified gateway for investors worldwide to access high-yield management strategies."
    }
]

const journeySteps = [
    {
        title: "Secure Onboarding",
        description: "Investors register through our streamlined portal, gaining immediate access to curated investment opportunities."
    },
    {
        title: "Precision Allocation",
        description: "Select from a range of ROI-optimized plans. Payments are processed securely via Stripe, directly into professional management accounts."
    },
    {
        title: "Stripe Connect Integration",
        description: "Upon investment, a dedicated Stripe Connect account is established for each investor, ensuring transparent fund tracking."
    },
    {
        title: "Wealth Realized",
        description: "At the end of the maturity period, ROI is automatically calculated and transferred to your verified account upon withdrawal approval."
    }
]

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-primary py-24 md:py-32">
                    {/* Animated Background Patters */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path
                                d="M0 50 Q 25 40 50 50 T 100 50"
                                stroke="white"
                                strokeWidth="0.5"
                                fill="none"
                                animate={{ d: ["M0 50 Q 25 40 50 50 T 100 50", "M0 50 Q 25 60 50 50 T 100 50", "M0 50 Q 25 40 50 50 T 100 50"] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M0 70 Q 25 60 50 70 T 100 70"
                                stroke="white"
                                strokeWidth="0.5"
                                fill="none"
                                animate={{ d: ["M0 70 Q 25 60 50 70 T 100 70", "M0 70 Q 25 80 50 70 T 100 70", "M0 70 Q 25 60 50 70 T 100 70"] }}
                                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                        </svg>
                    </div>

                    <div className="container relative z-10 mx-auto px-4 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl"
                        >
                            Architecting the Future of <br />
                            <span className="text-secondary-foreground">Personal Wealth</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl"
                        >
                            We bridge the gap between institutional-grade investment management and the individual investor through transparency, security, and world-class technology.
                        </motion.p>
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-2">
                            {/* Mission */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/50"
                            >
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Target className="h-8 w-8" />
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">Our Mission</h2>
                                <p className="text-lg leading-relaxed text-slate-600">
                                    To democratize institutional-grade investment management, providing a transparent,
                                    secure, and technologically advanced platform that empowers every individual
                                    to build and sustain generational wealth through intelligent capital allocation.
                                </p>
                                <div className="absolute -right-8 -bottom-8 opacity-5">
                                    <Target className="h-40 w-40" />
                                </div>
                            </motion.div>

                            {/* Vision */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/50"
                            >
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                    <Eye className="h-8 w-8" />
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">Our Vision</h2>
                                <p className="text-lg leading-relaxed text-slate-600">
                                    To be the global leader in accessible fintech solutions, where complex investment
                                    strategies are simplified into seamless user experiences, making financial
                                    freedom a shared reality for our global community.
                                </p>
                                <div className="absolute -right-8 -bottom-8 opacity-5 text-secondary">
                                    <Eye className="h-40 w-40" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* The Platform Journey */}
                <section className="py-20 pb-5 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl">How We Redefine Investing</h2>
                            <p className="mx-auto max-w-2xl text-slate-600">
                                A professional, automated process designed to maximize your returns while minimizing complexity.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Connection Line */}
                            <div className="absolute top-1/2 left-0 hidden h-0.5 w-full bg-slate-100 md:block -translate-y-1/2" />

                            <div className="grid gap-8 md:grid-cols-4">
                                {journeySteps.map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative z-10 flex flex-col items-center text-center"
                                    >
                                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-slate-50 text-xl font-bold text-primary shadow-lg">
                                            {idx + 1}
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-blue-800 px-8 py-16 text-center md:py-24">
                            {/* Decorative circles */}
                            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

                            <div className="relative z-10">
                                <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Ready to Secure Your Future?</h2>
                                <p className="mb-10 mx-auto max-w-xl text-lg text-white/70">
                                    Join thousands of investors who trust our platform for professional growth and automated wealth management.
                                </p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a
                                        href="/signup"
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-primary transition-shadow hover:shadow-xl"
                                    >
                                        Start Investing Now
                                        <ChevronRight className="h-5 w-5" />
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-slate-900 py-24 text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-3">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
                                >
                                    <val.icon className="mb-6 h-12 w-12 text-secondary transition-transform group-hover:scale-110" />
                                    <h3 className="mb-4 text-2xl font-bold">{val.title}</h3>
                                    <p className="text-slate-400">
                                        {val.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
