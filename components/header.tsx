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


const Navbar = ({className}: {className?: string}) => {
  return (
    <nav className={className || "hidden items-center gap-6 md:flex"}>
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
       <div className="flex max-[500px]:flex-col md:items-center gap-3">
          <Button className="max-[500px]:hidden" variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline" className="sm:hidden" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
        </nav> 
  )
}
export function Header() {
  return (
    <header className="border-b border-border bg-white backdrop-blur supports-[backdrop-filter]:bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex max-[500px]:-ml-5 items-center gap-2">
           <Image className="w-[190px] h-[80px]" src={logo} alt="2Zero Investment" />
        </Link>
        <div className="sm:hidden">
            <Sheet>
              <SheetTrigger>
                 <Menu className="md:hidden text-xl" />
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
