import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 5000,
    date: "2024-01-15",
    status: "completed",
    description: "Initial deposit",
  },
  {
    id: 2,
    type: "profit",
    amount: 420,
    date: "2024-02-01",
    status: "completed",
    description: "Monthly profit",
  },
  {
    id: 3,
    type: "profit",
    amount: 430,
    date: "2024-03-01",
    status: "completed",
    description: "Monthly profit",
  },
  {
    id: 4,
    type: "profit",
    amount: 440,
    date: "2024-04-01",
    status: "completed",
    description: "Monthly profit",
  },
  {
    id: 5,
    type: "profit",
    amount: 450,
    date: "2024-05-01",
    status: "completed",
    description: "Monthly profit",
  },
  {
    id: 6,
    type: "profit",
    amount: 460,
    date: "2024-06-01",
    status: "completed",
    description: "Monthly profit",
  },
]

export function TransactionsTable() {
  return (
    <Card id="transactions">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest investment activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${transaction.type === "deposit" ? "bg-primary/10 text-primary" : "bg-primary/10 text-accent"
                    }`}
                >
                  {transaction.type === "deposit" ? (
                    <ArrowDownLeft className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === "deposit" ? "text-foreground" : "text-accent"}`}>
                    {transaction.type === "deposit" ? "+" : "+"}${transaction.amount.toLocaleString()}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
