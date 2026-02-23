import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 rounded-2xl  flex items-center gap-2">
              <div className="w-[90px] h-[90px] bg-white rounded-full">
                <Image className="w-[90px] h-[90px]" src={logo} alt="2Zero Investment" />
              </div>
            </div>
            <p className="text-sm text-white">Professional investment management for everyone.</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#plans" className="text-white/80 hover:text-white">
                  Investment Plans
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-white/80 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-white/80 hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white/80 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white/80 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white">
                  Risk Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-white/80">
          <p>© 2025 2Zero Investment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
