import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Deposit",
    description: "Create your account and make your initial deposit starting from $5,000",
  },
  {
    number: "02",
    title: "Invest",
    description: "Our expert team allocates your funds across diversified investment portfolios",
  },
  {
    number: "03",
    title: "Earn",
    description: "Watch your investment grow with consistent returns of 10-15% annually",
  },
  {
    number: "04",
    title: "Withdraw",
    description: "Access your funds anytime with our flexible withdrawal options",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-border bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            How It Works
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">Start investing in four simple steps</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-pretty text-sm text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden translate-x-1/2 lg:block">
                  <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
