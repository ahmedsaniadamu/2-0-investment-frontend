'use client'
import { Calendar, CircleDollarSign, Home, Inbox, ScanLine, Search, Settings,  } from "lucide-react"
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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Investments",
    url: "#",
    icon: CircleDollarSign,
  },
  {
    title: "Profit Tracking",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Transactions",
    url: "#",
    icon: ScanLine ,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
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
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton className="text-white px-3 mb-3 py-5 hover:bg-primary hover:text-white hover:border-r-3 hover:rounded-none hover:border-white text-lg" asChild>
                    <a href={item.url} className="text-white px-3">
                       <item.icon className="text-white w-10 h-10" />

                      <span>{item.title}</span>
                    </a>
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