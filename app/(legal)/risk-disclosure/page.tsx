"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import {
    AlertTriangle,
    TrendingDown,
    Lock,
    Globe,
    ShieldAlert,
    Cpu,
    Scale,
    Coins
} from "lucide-react"

export default function RiskDisclosure() {
    const risks = [
        {
            id: "general",
            title: "1. General Investment Risk",
            icon: AlertTriangle,
            content: "All investments involve a degree of risk. You may not get back the full amount of your initial investment."
        },
        {
            id: "liquidity",
            title: "2. Liquidity and Lock-in Risk",
            icon: Lock,
            content: "The Platform enforces a strict 12-month lock-in period. During this time, your funds are deployed into active management strategies and CANNOT be withdrawn, redeemed, or accessed under any circumstances. Prospective investors must ensure they do not require access to these funds for the duration of the maturity period."
        },
        {
            id: "market",
            title: "3. Market Volatility",
            icon: TrendingDown,
            content: "Financial markets are subject to volatility caused by economic shifts, political events, and global crises. While our management strategies aim to mitigate these risks, extreme market conditions can impact the performance of the investment plans."
        },
        {
            id: "regulatory",
            title: "4. Regulatory and Legal Risk",
            icon: Scale,
            content: "The Platform operates under the laws of the Cooperative Republic of Guyana. Changes in local or international financial regulations, tax laws, or governmental policies could impact the operation of the Platform or the treatment of investment returns."
        },
        {
            id: "technology",
            title: "5. Operational and Cyber Risk",
            icon: Cpu,
            content: "As a digital platform, we are exposed to technological risks, including system outages, software bugs, and cybersecurity threats. While we employ bank-grade security and partner with industry leaders like Stripe, no digital system is entirely immune to sophisticated cyber-attacks."
        },
        {
            id: "counterparty",
            title: "6. Counterparty Risk",
            icon: Globe,
            content: "The Platform relies on third-party service providers, most notably Stripe, for payment processing and fund transfers. Any failure, insolvency, or operational disruption of these partners could delay payouts or impact account functionality."
        },
        {
            id: "currency",
            title: "7. Currency Exchange Risk",
            icon: Coins,
            content: "If you are investing from outside the primary operating currency of the platform, you may be exposed to currency exchange rate fluctuations which could reduce the value of your returns when converted back to your local currency."
        },
        {
            id: "no-insurance",
            title: "8. No Statutory Protection",
            icon: ShieldAlert,
            content: "Investments on this Platform are NOT deposits and are NOT insured by any government agency (such as the FDIC or equivalent). You are not protected by statutory compensation schemes in the event of a total loss of capital."
        }
    ]

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />

            <main className="flex-grow">
                {/* Header Hero */}
                <section className="relative overflow-hidden bg-primary py-24 text-white">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path
                                d="M50 0 L 100 100 L 0 100 Z"
                                stroke="white"
                                strokeWidth="0.2"
                                fill="none"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    <div className="container relative z-10 mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm"
                        >
                            <AlertTriangle className="h-10 w-10 text-white" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 text-4xl font-bold md:text-6xl"
                        >
                            Risk Disclosure
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto max-w-2xl text-lg text-white/80"
                        >
                            Please read this document carefully before making any investment. Understanding the risks involved is essential for responsible wealth management.
                        </motion.p>
                    </div>
                </section>

                {/* Introduction */}
                <section className="bg-white py-12">
                    <div className="container mx-auto px-4 text-center text-slate-600">
                        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-amber-500/20 bg-amber-50 p-6">
                            <p className="text-lg font-medium text-amber-900">
                                Participation in the 2Zero Investment platform involves significant financial risk. Investments are speculative and intended only for those who can afford the loss of their entire investment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl">
                            <div className="grid gap-8 md:grid-cols-2">
                                {risks.map((risk, idx) => {
                                    const Icon = risk.icon
                                    return (
                                        <motion.div
                                            key={risk.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="group overflow-hidden rounded-3xl bg-white border border-slate-100 p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
                                        >
                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-colors group-hover:bg-primary group-hover:text-white">
                                                <Icon className="h-7 w-7" />
                                            </div>
                                            <h2 className="mb-4 text-xl font-bold text-slate-900">
                                                {risk.title}
                                            </h2>
                                            <p className="text-lg leading-relaxed text-slate-600">
                                                {risk.content}
                                            </p>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Acknowdgement */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-20 overflow-hidden rounded-[3rem] bg-slate-900 p-12 text-white"
                            >
                                <div className="grid items-center gap-12 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-4 text-3xl font-bold">Investor Awareness</h3>
                                        <p className="text-lg text-slate-400">
                                            By proceeding with an investment, you acknowledge that you have read, understood, and accepted these risks in their entirety.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/10">
                                            <ShieldAlert className="h-6 w-6 text-primary" />
                                            <span className="text-sm">Bank-grade Encryption</span>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/10">
                                            <Lock className="h-6 w-6 text-primary" />
                                            <span className="text-sm">Secure Stripe Infrastructure</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
