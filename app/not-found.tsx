'use client'
import React from 'react'
import { Home, MoveLeft, Compass, ShieldAlert, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 relative overflow-hidden p-6">

            {/* Abstract background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-64 -right-64 w-[800px] h-[800px] bg-primary rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.05, 0.08, 0.05],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-64 -left-64 w-[800px] h-[800px] bg-blue-400 rounded-full blur-[150px]"
                />
            </div>

            <section className="flex flex-col items-center max-w-2xl w-full text-center relative z-10">

                {/* 404 Animated Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-8"
                >
                    <h1 className="text-[12rem] md:text-[16rem] font-black text-slate-100 leading-none select-none">
                        404
                    </h1>

                    <motion.div
                        animate={{
                            y: [-10, 10, -10],
                            rotate: [-5, 5, -5]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/20 border border-blue-50 relative group">
                            <Compass className="w-20 h-20 md:w-24 md:h-24 text-primary" strokeWidth={1.2} />

                            {/* Sparkling detail */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-2 -right-2 text-amber-400"
                            >
                                <Sparkles className="w-8 h-8 fill-current" />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-4 mb-10"
                >
                    <div className="flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
                        <ShieldAlert className="w-4 h-4" />
                        <span>Oops! Sorry</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        404 Page Not Found
                    </h2>
                    <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
                        The page you are looking for might have been moved, deleted, or never existed in this platform.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
                >
                    <Link href="/" className="w-full sm:w-auto">
                        <Button className="group w-full sm:w-auto px-8 py-7 text-lg font-bold rounded-2xl bg-primary hover:bg-black text-white transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95">
                            <Home className="w-5 h-5 mr-2" />
                            Return Home
                        </Button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-8 py-7 text-lg font-bold text-slate-600 hover:text-primary transition-colors group cursor-pointer"
                    >
                        <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </motion.div>
            </section>

            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#005b9e 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />
        </div>
    )
}
