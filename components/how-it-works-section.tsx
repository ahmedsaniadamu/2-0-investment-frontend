"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { UserPlus, BarChart3, TrendingUp, Wallet, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up in minutes with our secure and easy onboarding process. Verify your identity and get ready to start your wealth building journey.",
    icon: UserPlus,
    color: "#005b9e",
    animation: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    number: "02",
    title: "Choose Your Plan",
    description: "Select from our range of professional investment plans starting from $5,000. Each plan is tailored for different levels of capital and return goals.",
    icon: BarChart3,
    color: "#0ea5e9",
    animation: "bg-sky-100 dark:bg-sky-900/30",
  },
  {
    number: "03",
    title: "Expert Allocation",
    description: "Our professional management team allocates your funds across diversified portfolios to ensure consistent returns of 10-15% annually.",
    icon: TrendingUp,
    color: "#6366f1",
    animation: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    number: "04",
    title: "Track & Withdraw",
    description: "Watch your wealth grow in real-time through your dashboard. Access your initial capital and earnings easily at the end of the maturity period.",
    icon: Wallet,
    color: "#8b5cf6",
    animation: "bg-violet-100 dark:bg-violet-900/30",
  },
]

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#f8faff] py-20 pb-8 sm:pb-10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[150px]" />
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full"
          >
            The Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl"
          >
            Simple. Secure. <span className="text-primary">Rewarding.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-slate-600"
          >
            Our objective is to make high-end investment management accessible to everyone.
            Follow these four steps to start growing your wealth today.
          </motion.p>
        </div>

        <div ref={containerRef} className="relative max-w-7xl bg-primary rounded-xl pt-5 max-[500px]:py-8 mx-auto">
          {/* Vertical Center Line for Desktop */}
          <div className="absolute left-1/2 top-0 h-full w-[3px] bg-white hidden lg:block -translate-x-1/2" />

          <div className="space-y-24 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              const Icon = step.icon

              return (
                <div key={step.number} className="relative lg:min-h-[300px]">
                  <div className={`flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0 ${isEven ? "" : "lg:flex-row-reverse"}`}>

                    {/* Content Side */}
                    <div className="w-full lg:w-5/12">
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`text-center lg:text-left ${isEven ? "lg:text-right" : "lg:text-left"}`}
                      >
                        <div className={`mb-6 flex ${isEven ? "lg:justify-end" : "lg:justify-start"} justify-center`}>
                          <div className={`relative w-20 h-20 flex items-center justify-center rounded-3xl ${step.animation} text-primary shadow-sm group`}>
                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Icon className="w-10 h-10 relative z-10" />

                            {/* Animated SVG Sparkle/Decoration */}
                            <svg className="absolute -top-1 -right-1 w-8 h-8 text-yellow-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold px-10 text-white">{step.title}</h3>
                        <p className="text-white p-5 pt-0 leading-relaxed text-balance">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Desktop Step Number Circle */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:block">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative group"
                      >
                        {/* Rotating Glow Effect */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="relative w-16 h-16 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-primary font-bold text-xl shadow-lg z-10">
                          {step.number}
                        </div>
                      </motion.div>
                    </div>

                    {/* Spacer Side */}
                    <div className="hidden lg:block lg:w-5/12" />
                  </div>

                  {/* Cornered Connecting Lines with Arrows (Desktop Only) */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-[100px] left-0 w-full h-[300px] pointer-events-none hidden lg:block z-0">
                      <svg width="100%" height="100%" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d={isEven
                            ? "M 600, 0 L 600, 100 L 950, 100 L 950, 300" // Rectangular path
                            : "M 600, 0 L 600, 100 L 250, 100 L 250, 300"
                          }
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeOpacity="0.15"
                          strokeDasharray="10 5"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.path
                          d={isEven
                            ? "M 600, 0 L 600, 100 L 950, 100 L 950, 300"
                            : "M 600, 0 L 600, 100 L 250, 100 L 250, 300"
                          }
                          stroke={`url(#line-grad-${index})`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 0.2, 0.2, 0],
                            pathOffset: [0, 0, 0.8, 1],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.5
                          }}
                        />
                        <defs>
                          <linearGradient id={`line-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  )}

                  {/* Mobile Mobile Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 bottom-[-48px] -translate-x-1/2 lg:hidden">
                      <div className="w-[2px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
                      <ArrowRight className="w-5 h-5 text-white/30 rotate-90 absolute -bottom-4 -left-[9px]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
