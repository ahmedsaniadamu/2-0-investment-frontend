"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Shield, DollarSign, TrendingUp, Lock, HeadphonesIcon } from "lucide-react"

const faqCategories = [
    {
        title: "Getting Started & Verification",
        icon: Shield,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        questions: [
            {
                q: "What is 2Zero and how does it work?",
                a: "2Zero is a platform that allows members to fund specific growth plans and earn rewards over a fixed period. You simply create an account, verify your identity, choose a plan, and wait for the maturity date to withdraw your initial capital plus any accrued earnings."
            },
            {
                q: "Why do I need to upload my documents after signing up?",
                a: "We take security seriously. Before you can deposit funds, we must verify that you are a real person. This helps us prevent fraud and comply with financial regulations. Your documents are reviewed securely by our compliance team."
            },
            {
                q: "How long does the verification process take?",
                a: "Our team reviews every document to ensure safety. This process typically takes 12 to 24 hours. You will receive an email notification as soon as your account is approved and ready for use."
            },
            {
                q: "My verification was rejected. What do I do?",
                a: "Common reasons for rejection include blurry photos, expired documents, or a name mismatch. Please check your email for the specific reason, and then log in to upload a clear required documents, e.g valid copy of your Government ID (Passport, Driver's License, or National ID)."
            },
            {
                q: "Can I have multiple accounts?",
                a: "No. To maintain fair usage and security, we only allow one account per individual. Detection of duplicate accounts may lead to immediate suspension."
            }
        ]
    },
    {
        title: "Funding & Plans",
        icon: DollarSign,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        questions: [
            {
                q: "What payment methods do you accept?",
                a: "We accept payments securely via Bank Transfer (ACH) and Debit/Credit Cards through our payment partner, Stripe. We recommend Bank Transfers for larger amounts to ensure smoother processing."
            },
            {
                q: "Is there a minimum or maximum amount I can contribute?",
                a: "Yes. To ensure our plans are sustainable, we have set limits. The minimum depends on the plan, and the maximum per transaction is determined by specific plan tier. You can view these limits on each plan."
            },
            {
                q: "Can I cancel a plan after I have paid?",
                a: "Once payment is made you can't cancel the plan."
            },
            {
                q: "Are there any hidden fees when I deposit?",
                a: "We believe in transparency. We do not charge deposit fees; however, your bank or card issuer may charge a standard processing fee. The amount you see at checkout is the final amount you pay."
            }
        ]
    },
    {
        title: "Earning & Maturity",
        icon: TrendingUp,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        questions: [
            {
                q: "How long is the maturity period?",
                a: "Our standard plans are fixed for 12 months (1 year). This allows the capital to be deployed effectively to generate returns."
            },
            {
                q: "Can I withdraw my money before the 1 year is up?",
                a: "No. By joining a plan, you agree to lock your funds for the full 12-month duration. This commitment is what allows us to offer the projected rewards. Early withdrawals are not permitted under any circumstances."
            },
            {
                q: "How are my rewards calculated?",
                a: "Rewards are calculated based on the specific plan you selected at the time of deposit. These are fixed-rate rewards, meaning you will know exactly what your payout will be before you even pay."
            },
            // {
            //     q: "Do I have to pay taxes on my earnings?",
            //     a: "2Zero does not deduct taxes automatically. However, earnings from our platform may be considered capital gains or income in your country. We recommend consulting a tax professional to ensure you are compliant with your local laws."
            // }
        ]
    },
    {
        title: "Withdrawals (The \"Double KYC\" Explained)",
        icon: Lock,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        questions: [
            {
                q: "How do I withdraw my funds when they mature?",
                a: "When your plan matures, a \"Withdraw\" button will appear on your dashboard. You will be asked to link your bank account and verify your identity with our payout partner (Stripe), and the funds will be sent directly to you."
            },
            {
                q: "Why do I need to verify my identity again to withdraw?",
                a: "Great question. While we verified you manually at the start, our payout partner (Stripe) requires their own automated verification to legally process a transfer to your bank account. This is a one-time setup to ensure the money goes to the right person and to prevent money laundering."
            },
            {
                q: "How long does a withdrawal take to hit my bank account?",
                a: "Once you request a withdrawal, it typically takes 2–5 business days for the funds to appear in your bank account, depending on your bank's processing times."
            },
            {
                q: "Can I withdraw to a different person's bank account?",
                a: "No. For security reasons, the name on your bank account must match the name on your 2Zero profile. We do not support third-party transfers."
            }
        ]
    },
    {
        title: "Security & Trust",
        icon: HelpCircle,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        questions: [

            {
                q: "What happens if I forget my password or lose access to my email?",
                a: "You can use the \"Forgot Password\" link on the login page. If you lose access to your email entirely, you will need to contact support and go through a strict identity verification process to regain access to your funds."
            },
            {
                q: "How can I contact support if I have an issue?",
                a: "Our support team is available via the \"Help\" section in your dashboard or by emailing  support@2zeroinvestment.com. We aim to respond to all inquiries within 24 hours."
            }
        ]
    }
]

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary via-background to-blue-500">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="container relative mx-auto px-4 py-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge className="mb-4 animate-fade-in-up" variant="outline">
                            <HeadphonesIcon className="mr-2 h-3 w-3" />
                            Help Center
                        </Badge>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up animation-delay-100">
                            Frequently Asked{" "}
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
                            Everything you need to know about 2Zero. Can't find what you're looking for?
                            <br className="hidden sm:block" />
                            Contact our support team at{" "}
                            <a href="mailto: support@2zeroinvestment.com" className="font-medium text-primary hover:underline">
                                support@2zeroinvestment.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-4xl space-y-12">
                    {faqCategories.map((category, categoryIndex) => {
                        const Icon = category.icon
                        return (
                            <Card
                                key={categoryIndex}
                                className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${categoryIndex * 100}ms` }}
                            >
                                <CardContent className="p-0">
                                    {/* Category Header */}
                                    <div className={`flex items-center gap-3 border-b p-6 ${category.color}`}>
                                        <div className="rounded-lg bg-background/50 p-2 backdrop-blur-sm">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-xl font-bold sm:text-2xl">{category.title}</h2>
                                    </div>

                                    {/* Questions */}
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.questions.map((item, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`item-${categoryIndex}-${index}`}
                                                className="border-b last:border-b-0 px-6"
                                            >
                                                <AccordionTrigger className="text-left hover:no-underline py-5">
                                                    <span className="font-semibold text-base pr-4">
                                                        {item.q}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                                                    {item.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Contact CTA */}
                <Card className="mx-auto mt-16 max-w-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-xl">
                    <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <HeadphonesIcon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold">Still have questions?</h3>
                        <p className="mb-6 text-muted-foreground">
                            Our support team is here to help you 24/7
                        </p>
                        <a
                            href="mailto: support@2zeroinvestment.com"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105"
                        >
                            Contact Support
                        </a>
                    </CardContent>
                </Card>
            </section>

            <Footer />
        </div>
    )
}
