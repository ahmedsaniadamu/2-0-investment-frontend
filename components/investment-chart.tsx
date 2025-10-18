"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", value: 5000 },
  { month: "Feb", value: 5420 },
  { month: "Mar", value: 5850 },
  { month: "Apr", value: 6290 },
  { month: "May", value: 6740 },
  { month: "Jun", value: 7200 },
  { month: "Jul", value: 7680 },
  { month: "Aug", value: 8170 },
  { month: "Sep", value: 8680 },
  { month: "Oct", value: 9200 },
  { month: "Nov", value: 9740 },
  { month: "Dec", value: 10250 },
]

const chartConfig = {
  value: {
    label: "Portfolio Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function InvestmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Growth</CardTitle>
        <CardDescription>Your portfolio performance over the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="value"
              type="monotone"
              fill="var(--color-value)"
              fillOpacity={0.2}
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
