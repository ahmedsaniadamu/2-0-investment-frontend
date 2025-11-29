'use client'
import React, { useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { sharedPlans } from "@/api/plan"
import { Skeleton } from "./ui/skeleton"
import { formatNumberWithCommas } from "@/lib/format-number"

export const plans = []
export function PlansSection() {

  const { data: availablePlans, isPending } = useQuery({
    queryKey: ["get-plans"],
    queryFn: () => sharedPlans.getPlans(),
  });

  // New: refs + resume timer for controlling animation & manual scroll
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const resumeTimerRef = useRef<number | null>(null)

  const pauseAnimation = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused"
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
  }

  const resumeAnimation = (delay = 3000) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = window.setTimeout(() => {
      if (trackRef.current) trackRef.current.style.animationPlayState = ""
      resumeTimerRef.current = null
    }, delay)
  }

  const scrollByDelta = (delta: number) => {
    const w = wrapperRef.current
    if (!w) return
    pauseAnimation()
    w.scrollBy({ left: delta, behavior: "smooth" })
    resumeAnimation()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollByDelta(-320)
      if (e.key === "ArrowRight") scrollByDelta(320)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  return (
    <section id="plans" className="border-b border-border bg-white py-20 md:py-32 overflow-hidden">
      <style>{`
  .scroll-wrapper {
    /* changed to allow horizontal scrolling for manual controls */
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    scroll-behavior: smooth;
  }
  /* hide default scrollbar (visual) */
  .scroll-wrapper::-webkit-scrollbar { display: none; }
  .scroll-wrapper { -ms-overflow-style: none; scrollbar-width: none; }

  .scroll-track {
    display: flex;
    width: max-content;
    animation: scroll-pingpong 48s ease-in-out infinite;
  }

  /* Pause scroll on hover */
  .scroll-wrapper:hover .scroll-track {
    animation-play-state: paused;
  }

  @keyframes scroll-pingpong {
    0%   { transform: translateX(0); }
    40%  { transform: translateX(-50%); }   /* reach end */
    50%  { transform: translateX(-50%); }   /* pause */
    90%  { transform: translateX(0); }       /* scroll back */
    100% { transform: translateX(0); }       /* pause at start */
  }
`}</style>
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Choose Your Investment Plan
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Select the investment tier that matches your capital capacity
          </p>
        </div>

        {isPending ? (
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[240px] bg-slate-200 rounded-lg" />
            ))}
          </div>
        ) : availablePlans?.length ? (
          // Wrap scroll area in a relative container so we can position buttons
          <div className="relative">
            {/* Left button */}
            <button
              aria-label="Scroll left"
              onClick={() => scrollByDelta(-320)}
                className="absolute left-2 md:left-[-70px] top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white focus:outline-none"
            >
              {/* simple SVG angle-left */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Scroll wrapper now has ref */}
            <div ref={wrapperRef} className="scroll-wrapper">
              {/* scroll-track has ref so we can pause/resume animation from JS */}
              <div ref={trackRef} className="scroll-track">
                {[/*...availablePlans, */...availablePlans].map((plan: any, i: number) => {
                  const isPopular =
                    [...availablePlans].sort((a, b) => b.investmentCount - a.investmentCount)[0]
                      ?.investmentCount === plan?.investmentCount;

                  return (
                    <Card
                      key={plan.name + i}
                      className={`mx-4 w-[300px] flex-shrink-0 ${
                        isPopular ? "relative border-primary shadow-lg" : ""
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-0 z-[1000] left-1/2 -translate-x-1/2">
                          <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-foreground">{plan.roi}</span>
                            <span className="text-muted-foreground">annual ROI</span>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            Investment Range:
                            <div className="font-semibold text-foreground">
                              ${formatNumberWithCommas(plan.minDeposit)} - ${formatNumberWithCommas(plan.maxDeposit)}
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href="/signup">Invest Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Right button */}
            <button
              aria-label="Scroll right"
              onClick={() => scrollByDelta(320)}
              className="absolute right-2 md:right-[-70px] top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white focus:outline-none"
            >
              {/* simple SVG angle-right */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
