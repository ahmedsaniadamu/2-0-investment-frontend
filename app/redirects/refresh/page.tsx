'use client'
import React from 'react'
import { Rocket, ShieldCheck, CheckCircle, LayoutDashboard, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const RefreshOnboardingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-white via-blue-50/20 to-gray-50 rounded-3xl overflow-hidden relative border border-gray-100 shadow-sm">

            {/* Abstract background highlights */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-[#005b9e] rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-blue-400 rounded-full blur-[120px]"
                />
            </div>

            <section className="flex flex-col items-center max-w-3xl w-full p-8 text-center relative z-10">

                {/* Animated Stage Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: 5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                    className="mb-10 relative"
                >
                    <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-blue-200/50 border border-blue-50 relative z-10 transform group">
                        <Rocket className="w-20 h-20 text-[#005b9e]" strokeWidth={1.5} />

                        {/* Floating sparkles */}
                        <motion.div
                            animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4 text-amber-400"
                        >
                            <Sparkles className="w-8 h-8 fill-current" />
                        </motion.div>
                    </div>

                    {/* Status verification seal */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="absolute -bottom-3 -right-3 bg-green-500 text-white p-3 rounded-full border-4 border-white shadow-xl flex items-center justify-center"
                    >
                        <CheckCircle className="w-6 h-6" />
                    </motion.div>
                </motion.div>

                {/* Typography Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6 mb-12"
                >
                    <div className="space-y-2">
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-2">
                            Info Synchronized
                        </span>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-[1.1]">
                            Already Set Up! <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005b9e] to-blue-400">
                                Your Profile is Complete
                            </span>
                        </h1>
                    </div>
                    <p className="text-md md:text-lg text-gray-600 max-w-xl mx-auto font-medium leading-relaxed">
                        It looks like you have already provided your onboarding information. You're all set to explore your investment portfolio!
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col -mt-8 sm:flex-row items-center gap-5 w-full justify-center"
                >
                    <Link href="/investor" className="w-[300px] sm:w-auto">
                        <Button variant="default" className="w-[300px] text-center sm:w-auto px-10 py-8 text-md font-bold rounded-2xl border-2 border-gray-200 hover:border-[#005b9e] hover:bg-white hover:text-[#005b9e] transition-all duration-300 hover:-translate-y-1.5 active:scale-95">
                            <LayoutDashboard className="w-6 h-6 mr-2" />
                            Go to Dashboard
                        </Button>
                    </Link>
                </motion.div>

                {/* Trust indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 flex items-center gap-2 text-gray-400 font-medium text-sm border-t border-gray-100 pt-8 w-full justify-center"
                >
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>Protected by 2Zero Investment Secure Environment</span>
                </motion.div>
            </section>
        </div>
    )
}

export default RefreshOnboardingPage