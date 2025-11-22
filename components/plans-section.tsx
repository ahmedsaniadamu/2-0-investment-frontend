'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { sharedPlans } from "@/api/plan"
import { Skeleton } from "./ui/skeleton"

export const plans = []
export function PlansSection() {

  const { data: availablePlans, isPending } = useQuery({
    queryKey: ["get-plans"],
    queryFn: () => sharedPlans.getPlans(),
  });

  return (
    <section id="plans" className="border-b border-border bg-white py-20 md:py-32 overflow-hidden">
      <style>{`
  .scroll-wrapper {
    overflow: hidden;
    width: 100%;
  }

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
          <div className="scroll-wrapper">
            <div className="scroll-track">
              {[...availablePlans, ...availablePlans].map((plan: any, i: number) => {
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
                            {plan.minDeposit} - {plan.maxDeposit}
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
        ) : null}
      </div>
    </section>
  );
}
