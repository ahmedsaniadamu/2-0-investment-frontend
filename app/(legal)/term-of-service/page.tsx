"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { FileText, Shield, Scale, Clock, AlertCircle, CheckCircle2, TrendingUp, Lock, ShieldCheck } from "lucide-react"

export default function TermsOfService() {
    const sections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            icon: CheckCircle2,
            content: "By accessing, registering, investing, or using this website (\"Platform\"), you (\"User,\" \"Investor,\" or \"Client\") acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions. If you do not agree, you must immediately discontinue use of the Platform. Use of the Platform constitutes a legally binding agreement between the User and the Company."
        },
        {
            id: "nature",
            title: "2. Nature of the Service",
            icon: FileText,
            content: "The Platform provides access to structured investment programs offered by the Company.\n\nAll investments:\n• Are fixed-term contractual commitments.\n• Are subject to market, operational, and financial risks.\n• Are not savings accounts, bank deposits, or insured financial products.\n\nThe Company does not guarantee profits unless explicitly stated in a signed investment agreement."
        },
        {
            id: "eligibility",
            title: "3. Eligibility",
            icon: Scale,
            content: "By using this Platform, the User confirms:\n• They are at least 18 years old.\n• They possess legal capacity to enter contracts.\n• Funds invested belong legally to them.\n• Funds are not derived from illegal activities.\n\nThe Company reserves the right to request identity verification at any time."
        },
        {
            id: "lock-in",
            title: "4. Investment Commitment and Lock-in Period",
            icon: Clock,
            content: "All investments made through the Platform are irrevocably committed for the selected investment duration (\"Maturity Period\").\n\nSTRICT NO WITHDRAWAL POLICY:\nFunds CANNOT be withdrawn, redeemed, reversed, or refunded prior to the maturity date under ANY circumstances, including but not limited to personal emergencies, financial hardship, market conditions, account closure requests, or change of circumstances.\n\nThe User permanently waives any right to early redemption, partial withdrawal, cancellation after funding, or payment chargebacks. Any attempt to reverse payments constitutes a material breach of this Agreement."
        },
        {
            id: "maturity",
            title: "5. Maturity and Payout",
            icon: TrendingUp,
            content: "Upon maturity, returns and principal (if applicable) will be processed according to the investment plan terms. Processing timelines may vary due to compliance, liquidity management, or operational procedures."
        },
        {
            id: "risk",
            title: "6. Risk Disclosure",
            icon: AlertCircle,
            content: "The User acknowledges that investments carry risk, including possible loss. Past performance does not guarantee future results. The User accepts full financial responsibility for investment decisions."
        },
        {
            id: "advice",
            title: "7. No Financial Advice",
            icon: Shield,
            content: "All information provided on the Platform is for informational purposes only and does not constitute financial, legal, or investment advice."
        },
        {
            id: "discretion",
            title: "8. Company Discretion and Operational Authority",
            icon: Scale,
            content: "The Company reserves absolute discretion to modify investment offerings, suspend accounts for compliance review, delay transactions for security or regulatory reasons, or refuse service where legal concerns arise."
        },
        {
            id: "security",
            title: "9. Account Security",
            icon: Lock,
            content: "Users are responsible for maintaining confidentiality of login credentials and all activities conducted under their account. The Company is not liable for losses resulting from unauthorized access caused by user negligence."
        },
        {
            id: "aml",
            title: "10. Anti-Money Laundering (AML) & Compliance",
            icon: ShieldCheck,
            content: "The Company may request verification documents, freeze accounts pending investigation, and report suspicious transactions to authorities. Failure to comply may result in account suspension."
        },
        {
            id: "liability",
            title: "11. Limitation of Liability",
            icon: AlertCircle,
            content: "To the fullest extent permitted by law, the Company shall not be liable for investment losses, market fluctuations, technological interruptions, third-party payment failures, or indirect damages. Maximum liability shall never exceed the amount invested by the User."
        },
        {
            id: "indemnification",
            title: "12. Indemnification",
            icon: Shield,
            content: "The User agrees to indemnify and hold harmless the Company, its directors, officers, employees, and affiliates against any claims arising from misuse of the Platform, violation of laws, or breach of these Terms."
        },
        {
            id: "force-majeure",
            title: "13. Force Majeure",
            icon: Clock,
            content: "The Company shall not be liable for delays or failures caused by events beyond reasonable control, including natural disasters, war, cyber incidents, regulatory changes, or financial system disruptions."
        },
        {
            id: "termination",
            title: "14. Termination",
            icon: AlertCircle,
            content: "The Company may suspend or terminate accounts without notice if Terms are violated, fraudulent activity is suspected, or compliance risks arise. Termination does not affect locked investments until maturity."
        },
        {
            id: "governing-law",
            title: "15. Governing Law",
            icon: Scale,
            content: "These Terms shall be governed by the laws of the Cooperative Republic of Guyana\n\nAll disputes shall be resolved exclusively within this jurisdiction."
        },
        {
            id: "dispute",
            title: "16. Dispute Resolution",
            icon: FileText,
            content: "Users agree to attempt good-faith negotiation first and submit disputes to binding arbitration before court proceedings where permitted by law."
        },
        {
            id: "modifications",
            title: "17. Modifications",
            icon: Clock,
            content: "The Company may update these Terms at any time. Continued use of the Platform constitutes acceptance of revised Terms."
        },
        {
            id: "entire-agreement",
            title: "18. Entire Agreement",
            icon: CheckCircle2,
            content: "These Terms constitute the entire agreement between the User and the Company and supersede all prior communications."
        }
    ]

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />

            <main className="flex-grow">
                {/* Header Hero */}
                <section className="relative overflow-hidden bg-primary py-20 text-white">
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
                        </svg>
                    </div>

                    <div className="container relative z-10 mx-auto px-4 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 text-4xl font-bold md:text-6xl"
                        >
                            Terms & Conditions
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-white/80"
                        >
                            Effective Date: February 25, 2026
                        </motion.p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl">
                            <div className="space-y-12">
                                {sections.map((section, idx) => {
                                    const Icon = section.icon
                                    return (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                                            className="group relative"
                                        >
                                            <div className="flex items-start gap-6">
                                                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-md transition-transform group-hover:scale-110">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div className="flex-grow rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                                                    <h2 className="mb-4 text-xl font-bold text-slate-900 md:text-2xl">
                                                        {section.title}
                                                    </h2>
                                                    <div className="whitespace-pre-line text-lg leading-relaxed text-slate-600">
                                                        {section.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Footer Note */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-16 rounded-3xl bg-slate-900 p-10 text-center text-white"
                            >
                                <h3 className="mb-4 text-2xl font-bold">Have Questions?</h3>
                                <p className="mb-8 text-slate-400">
                                    If you have any questions regarding these Terms and Conditions, please contact us.
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary transition-colors hover:bg-slate-100"
                                >
                                    Contact Support
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

