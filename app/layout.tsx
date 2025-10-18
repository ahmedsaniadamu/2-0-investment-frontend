import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import QueryProvider from "@/components/query-provider"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "2Zero Investment - Grow Your Wealth with 10% Annual Returns",
  description:
    "Professional investment management starting from $5,000. Earn up to 15% annual returns with our trusted investment platform.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={'Loading..'}>
          <Toaster className="bg-primary text-white"  />
            <QueryProvider>
               {children}
            </QueryProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
