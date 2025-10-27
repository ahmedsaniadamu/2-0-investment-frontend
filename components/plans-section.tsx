import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import {v4 } from 'uuid'
export const plans = [
	{
		name: "Basic Investment",
		description: "Entry level investment package",
		minDeposit: "$5,000",
		maxDeposit: "$50,000",
		roi: "20-30%",
		id: v4()
	},
	{
		name: "Advanced Investment",
		description: "Mid-range investment package",
		minDeposit: "$50,000",
		maxDeposit: "$500,000",
		roi: "30-40%",
		popular: true,
		id: v4()
	},
	{
		name: "Premium Investment",
		description: "High-value investment package",
		minDeposit: "$500,000",
		maxDeposit: "$5,000,000",
		roi: "40-50%",
		id: v4()
	},
]

export function PlansSection() {
	return (
		<section id="plans" className="border-b border-border bg-white py-20 md:py-32">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
						Choose Your Investment Plan
					</h2>
					<p className="text-pretty text-lg text-muted-foreground">
						Select the investment tier that matches your capital capacity
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{plans.map((plan) => (
						<Card key={plan.name} className={plan.popular ? "relative border-primary shadow-lg" : ""}>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
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
								<Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
									<Link href="/signup">Invest Now</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
