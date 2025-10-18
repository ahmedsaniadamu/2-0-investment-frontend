import Link from "next/link"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b border-border bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
           <Image className="w-[190px] h-[80px]" src={logo} alt="2Zero Investment" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#plans"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Plans
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="/#testimonials"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Testimonials
          </Link>
       <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
        </nav> 
      </div>
    </header>
  )
}
