import Link from "next/link"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"
import Image from "next/image"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const Navbar = ({ className }: { className?: string }) => {
  return (
    <nav className={className || "hidden items-center gap-6 md:flex justify-end pr-5"}>
      <Link
        href="/#plans"
        className="text-sm font-medium text-white transition-colors hover:text-foreground"
      >
        Plans
      </Link>
      <Link
        href="/#how-it-works"
        className="text-sm font-medium text-white transition-colors hover:text-foreground"
      >
        How It Works
      </Link>
      <Link
        href="/faq"
        className="text-sm font-medium text-white transition-colors hover:text-foreground"
      >
        FAQ
      </Link>
      <Link
        href="/#testimonials"
        className="text-sm font-medium text-white transition-colors hover:text-foreground"
      >
        Testimonials
      </Link>
      <div className="flex max-[500px]:flex-col md:items-center gap-3">
        <Button className="max-[500px]:hidden text-white" variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline" className="sm:hidden text-white" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild className="text-primary bg-white">
          <Link href="/signup">Create Account</Link>
        </Button>
      </div>
    </nav>
  )
}
export function Header() {
  return (
    <header className="relative z-50 w-full shadow mb-5">
      <div className="w-full flex h-20 items-center justify-between">
        <Link href="/" className="flex max-[500px]:-ml-5  items-center gap-2">
          <div className="bg-white p-0 rounded-full ml-2">
            <Image className="w-[70px] h-[70px] rounded-full" src={logo} alt="2Zero Investment" />
          </div>
        </Link>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="md:hidden text-3xl pl-5 text-primary" size={60} />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetDescription>
                  <Navbar className="flex flex-col gap-5" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <Navbar />
      </div>
    </header>
  )
}
