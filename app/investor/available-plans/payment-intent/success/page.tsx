'use client'
import React from 'react'
import InvestorPageLayout from '@/app/investor/_components/investor-page-layout'
import { CheckCircle2, ArrowLeft, Mail, ShieldCheck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const SuccessPage = () => {
    return (
        <InvestorPageLayout>
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-white to-gray-50/50 rounded-3xl overflow-hidden mt-4">
                <section className="flex flex-col items-center max-w-2xl w-full p-8 text-center">
                    {/* Success Icon Animation */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                        className="mb-8 relative"
                    >
                        <div className="bg-green-100 p-6 rounded-full relative z-10">
                            <CheckCircle2 className="w-24 h-24 text-green-600" strokeWidth={2.5} />
                        </div>
                        {/* Decorative background circles */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-green-200 rounded-full -m-4 blur-xl z-0"
                        />
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4 mb-10"
                    >
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Payment Confirmed!
                        </h1>
                        <p className="text-xl text-gray-600 font-medium">
                            Thank you for your investment
                        </p>
                        <div className="h-1 w-20 bg-green-500 mx-auto rounded-full mt-2" />
                    </motion.div>

                    {/* Status Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10"
                    >
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 text-left">
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">Confirmation</h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    A detailed receipt has been sent to your email address.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 text-left">
                            <div className="bg-amber-50 p-3 rounded-xl">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">Processing</h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Investment is currently <b>pending</b> admin verification.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="w-full sm:w-auto"
                    >
                        <Link href="/investor/available-plans" className="block">
                            <Button className="group relative w-full sm:w-auto px-10 py-7 text-lg font-semibold rounded-2xl bg-gray-900 hover:bg-black text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="flex items-center justify-center gap-3">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    Back to Available Plans
                                </span>
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Security Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 flex items-center gap-2 text-gray-400 text-sm"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Secured by Stripe & 2Zero Investment</span>
                    </motion.div>
                </section>
            </div>
        </InvestorPageLayout>
    )
}

export default SuccessPage
