"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import {
    ShieldCheck,
    Database,
    UserCheck,
    Lock,
    Eye,
    FileSearch,
    Trash2,
    Mail,
    Fingerprint
} from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
    const sections = [
        {
            id: "collection",
            title: "1. Information We Collect",
            icon: Database,
            content: "We collect information necessary to provide our services and comply with legal requirements. This includes:\n\n• Personal Identification: Name, date of birth, and contact details (email, phone number).\n• KYC Documentation: Copies of government-issued IDs, proof of address, and other documents required for identity verification.\n• Financial Data: While we do not store full card details, our payment partner (Stripe) collects billing information to process investments.\n• Technical Data: IP addresses, browser type, and interaction data to improve platform security and performance."
        },
        {
            id: "usage",
            title: "2. How We Use Your Information",
            icon: Eye,
            content: "Your data is used to maintain a secure and efficient investment environment:\n\n• Account Management: Creating and managing your user profile.\n• Transaction Processing: Facilitating your investments and annual payouts via Stripe.\n• Identity Verification: Completing mandatory Anti-Money Laundering (AML) and Know Your Customer (KYC) checks.\n• Platform Improvement: Analyzing usage patterns to enhance our offerings and user experience.\n• Legal Compliance: Fulfilling reporting obligations to financial authorities."
        },
        {
            id: "sharing",
            title: "3. Data Sharing and Transfers",
            icon: UserCheck,
            content: "We do not sell your personal data. We only share information with trusted partners for essential services:\n\n• Payment Partners: We share data with Stripe to process payments and establish your Connect account for payouts.\n• Regulatory Authorities: When required by law (especially in the Cooperative Republic of Guyana), we may disclose information to prevent fraud or money laundering.\n• Third-Party Service Providers: Partners who help us with identity verification, hosting, and platform security."
        },
        {
            id: "security",
            title: "4. Data Security",
            icon: Lock,
            content: "We implement robust technical and organizational measures to protect your data. All communication is encrypted via SSL/TLS. Our infrastructure is designed to align with industry-standard security protocols. Since we leverage Stripe for financial processing, your card details are handled within their PCI-compliant environment, ensuring the highest level of payment security."
        },
        {
            id: "retention",
            title: "5. Data Retention",
            icon: FileSearch,
            content: "We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy. Due to financial regulations and AML requirements, we are typically required to store investor records (including identity documents and transaction history) for a minimum of five years after the account is closed or the last transaction is completed."
        },
        {
            id: "rights",
            title: "6. Your Rights",
            icon: Trash2,
            content: "Depending on your jurisdiction, you may have rights regarding your personal data:\n\n• Access: Request a copy of the data we hold about you.\n• Correction: Ask us to update or fix inaccurate information.\n• Deletion: Request data deletion (subject to our legal retention obligations).\n• Portability: Request a transfer of your data to another service."
        },
        {
            id: "cookies",
            title: "7. Cookies and Tracking",
            icon: Fingerprint,
            content: "We use essential cookies to manage your session and ensure the platform's security. We may also use analytical cookies to understand how you navigate our site. You can manage cookie preferences through your browser settings, though disabling essential cookies may impact platform functionality."
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
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="white"
                                strokeWidth="0.1"
                                fill="none"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="30"
                                stroke="white"
                                strokeWidth="0.1"
                                fill="none"
                                animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    <div className="container relative z-10 mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                        >
                            <ShieldCheck className="h-10 w-10 text-white" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 text-4xl font-bold md:text-6xl"
                        >
                            Privacy Policy
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto max-w-2xl text-lg text-white/80"
                        >
                            Your trust is our most valuable asset. We are committed to protecting your personal information with the highest security standards.
                        </motion.p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl space-y-16">
                            {sections.map((section, idx) => {
                                const Icon = section.icon
                                return (
                                    <motion.div
                                        key={section.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="flex flex-col md:flex-row gap-8 items-start"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-lg shadow-primary/5">
                                                <Icon className="h-8 w-8" />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h2 className="mb-4 text-2xl font-bold text-slate-900">
                                                {section.title}
                                            </h2>
                                            <div className="whitespace-pre-line text-lg leading-relaxed text-slate-600">
                                                {section.content}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="mt-20 overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-accent p-1 hidden md:block"
                            >
                                <div className="rounded-[2.9rem] bg-white p-12 text-center">
                                    <h3 className="mb-4 text-3xl font-bold text-slate-900">Privacy Questions?</h3>
                                    <p className="mb-8 mx-auto max-w-xl text-lg text-slate-600">
                                        If you have any questions or concerns about how we handle your data, our Data Protection Officer is here to help.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <Link
                                            href="/contact"
                                            className="rounded-2xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                                        >
                                            Contact Support
                                        </Link>
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
