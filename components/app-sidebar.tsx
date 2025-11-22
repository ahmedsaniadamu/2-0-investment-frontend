'use client'
import { Calendar, ChartSpline, CircleDollarSign, Home, Inbox, LayoutDashboard, ScanLine, Search, Settings, UserCircle,  } from "lucide-react"
import Image from "next/image"
import logo from "@/assets/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Menu items.
const investorModules = [
  {
    title: "Dashboard",
    url: "/investor/",
    icon: LayoutDashboard ,
  },
  {
    title: "Plans",
    url: "/investor/available-plans",
    icon: ChartSpline,
  },
  {
    title: "Investments",
    url: "/investor/investments",
    icon: CircleDollarSign,
  },
  {
    title: "Transactions",
    url: "/investor/transactions",
    icon: ScanLine ,
  },
  {
    title: "Profile Setting",
    url: "/investor/settings",
    icon: UserCircle,
  },
]

export function AppSidebar({items = investorModules}: {items?: {
  title: string
  url: string
  icon: any
}[]}) {

  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full bg-white mt-8 flex justify-center">
             <div className="mb-2 mt-3 rounded-full bg-white text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image className="w-[80px] h-[80px]" src={logo} alt="2Zero Investment" />
            </Link>
          </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-12">
            <SidebarMenu>
              {items.map((item, index: number) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton className={`text-white px-3 ${
                    index === 0 && pathname === '/investor' ? "border-r-3 pl-2 border-white rounded-none" :
                     pathname.includes(item.url) && (index !== 0) ?
                     "border-r-3 border-white pl-2 rounded-none" : ""
                  } mb-3 py-5 hover:bg-primary hover:text-white hover:border-r-3 hover:rounded-none hover:border-white text-lg`} asChild>
                    <Link href={item.url} className="text-white px-3">
                       <item.icon className="text-white w-10 h-10" />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}