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


const Navbar = ({ className, isTransaprent }: { className?: string, isTransaprent?: boolean }) => {
  return (
    <nav className={className || "hidden items-center gap-6 md:flex justify-end pr-5"}>
      <Link
        href="/"
        className={`text-sm font-medium ${isTransaprent ? "text-white" : "text-primary"} transition-colors hover:text-foreground`}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`text-sm font-medium ${isTransaprent ? "text-white" : "text-primary"} transition-colors hover:text-foreground`}
      >
        About Us
      </Link>
      <Link
        href="/#plans"
        className={`text-sm font-medium ${isTransaprent ? "text-white" : "text-primary"} transition-colors hover:text-foreground`}
      >
        Plans
      </Link>
      <Link
        href="/#how-it-works"
        className={`text-sm font-medium ${isTransaprent ? "text-white" : "text-primary"} transition-colors hover:text-foreground`}
      >
        How It Works
      </Link>
      <Link
        href="/faq"
        className={`text-sm font-medium ${isTransaprent ? "text-white" : "text-primary"} transition-colors hover:text-foreground`}
      >
        FAQ
      </Link>
      <div className="flex max-[500px]:flex-col md:items-center gap-3">
        <Button className={`max-[500px]:hidden ${isTransaprent ? "text-white" : "text-primary"}`} variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline" className={`sm:hidden ${isTransaprent ? "text-white" : "text-primary"}`} asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild className={` ${isTransaprent ? "text-primary bg-white" : "text-white bg-primary"}`}>
          <Link href="/signup">Create Account</Link>
        </Button>
      </div>
    </nav >
  )
}
export function Header({
  isTransaprent = false,
  hasSpacing = false,
  bgColor
}: {
  isTransaprent?: boolean
  hasSpacing?: boolean
  bgColor?: string
}) {
  return (
    <header className={`relative z-50 w-full shadow ${isTransaprent ? bgColor || "bg-transparent" : "bg-white"} ${hasSpacing ? "mb-5" : ""}`}>
      <div className="w-full flex h-20 items-center justify-between">
        <Link href="/" className="flex max-[500px]:ml-1  items-center gap-2">
          <div className={`bg-white p-0 rounded-full ml-2`}>
            <Image className="w-[60px] h-[60px]  rounded-full" src={logo} alt="2Zero Investment" />
          </div>
        </Link>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className={`md:hidden pr-2 text-3xl pl-5 ${isTransaprent ? "text-white" : "text-primary"}`} size={60} />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetDescription>
                  <Navbar isTransaprent={false} className="flex flex-col gap-5" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <Navbar isTransaprent={isTransaprent} />
      </div>
    </header>
  )
}
