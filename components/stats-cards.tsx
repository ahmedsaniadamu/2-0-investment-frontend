import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, DollarSign, Percent, TrendingUp, Calendar } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">$10,250.00</div>
          <p className="mt-1 flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-accent" />
            <span className="text-accent">+$5,250</span>
            <span className="ml-1">from principal</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">$5,250.00</div>
          <p className="mt-1 flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-accent" />
            <span className="text-accent">+105%</span>
            <span className="ml-1">total return</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Annual ROI</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">10.5%</div>
          <p className="mt-1 text-xs text-muted-foreground">Growth Plan active</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Investment Duration</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">12 months</div>
          <p className="mt-1 text-xs text-muted-foreground">Since Jan 2024</p>
        </CardContent>
      </Card>
    </div>
  )
}
