'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Header } from "./header"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden  bg-primary py-20 pt-0 md:pt-0 md:py-32">
      <Header />
      {/* Add the scanning effect element */}
      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-[#81a1f8] via-white/20 to-transparent"
        initial={{ x: '-50%', y: '-50%', scale: 0.8, rotate: 0 }} // Start at the center with slight scaling
        animate={{ x: ['-50%', '10%', '50%', '10%', '-50%'], y: ['-50%', '-30%', '0%', '30%', '-50%'], rotate: 360 }} // Larger circular motion
        transition={{
          duration: 10, // Slower and smoother motion
          repeat: Infinity,
          ease: "linear" // Continuous motion
        }}
        style={{ willChange: 'transform, opacity' }} // Optimize for animation
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_60%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }} // Reduced duration
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-primary backdrop-blur-sm px-4 py-2 text-sm"
          >
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">
              Your next investment partner
            </span>
          </motion.div> */}

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
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full text-white sm:w-auto bg-transparent backdrop-blur-sm" asChild>
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
