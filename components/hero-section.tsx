'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Header } from "./header"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden  bg-primary py-20 pt-0 md:pt-0 md:py-32">
      <Header isTransaprent hasSpacing />
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[20, 35, 50, 65, 80].map((y, i) => (
            <motion.path
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                d: [
                  `M0 ${y} Q 25 ${y - 10} 50 ${y} T 100 ${y}`,
                  `M0 ${y} Q 25 ${y + 10} 50 ${y} T 100 ${y}`,
                  `M0 ${y} Q 25 ${y - 10} 50 ${y} T 100 ${y}`
                ]
              }}
              transition={{
                d: {
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                },
                pathLength: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 2 }
              }}
              stroke="white"
              strokeWidth="0.3"
              fill="none"
            />
          ))}
        </svg>
      </div>
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }} // Reduced duration
            className="mb-6 pt-12 text-white text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            Grow your wealth with steady{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-slate-300">
              annual returns
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }} // Reduced duration
            className="mb-10 text-pretty text-lg text-slate-200 md:text-xl"
          >
            Start investing with as little as $5,000 and watch your money grow. Professional investment management made
            simple and accessible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }} // Reduced duration
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="w-full max-[500px]:h-[60px] bg-white hover:bg-white/90 text-primary sm:w-auto" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full max-[500px]:h-[60px] hover:bg-white/90 hover:text-primary text-white sm:w-auto bg-transparent backdrop-blur-sm" asChild>
              <Link href="/#plans">View Plans</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8"
          >
            {([
              { value: "10-15%", label: "Annual Returns" },
              { value: "$5K", label: "Minimum Deposit" },
              { value: "24/7", label: "Support" },
            ])
              .map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-slate-300 md:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
