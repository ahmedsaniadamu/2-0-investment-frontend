'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import wavingHand from "@/assets/twemoji_waving-hand.png"
import React, { useEffect, useState } from 'react'
import { Settings } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useRouter } from "next/navigation"
import userImg from '@/assets/user.png';
import { AppSidebar } from "@/components/app-sidebar"
const InvestorPageLayout = ({ children }: { children: React.ReactNode }) => {

  const [greeting, setGreeting] = useState<string>('');
   const router = useRouter();

  useEffect(() => {
    const updateGreeting = () => {
      const today = new Date();
      const hourOfDay = today.getHours();
      if (hourOfDay > 11 && hourOfDay <= 16) {
        setGreeting('afternoon');
      } else if (hourOfDay > 16) {
        setGreeting('evening');
      } else {
        setGreeting('morning');
      }
    };
    // Update greeting immediately
    updateGreeting();
    // Set up interval to update greeting every hour
    const interval = setInterval(updateGreeting, 3600000); // 3600000 ms = 1 hour
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar  />
      <main className="w-full overflow-x-hidden">
        <header className="flex shadow px-3 bg-white py-5 sticky justify-between">
             <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h5 className='text-sm capitalize font-bold flex items-center'>
                Good {greeting}, Ahmed Sani &nbsp;
                <Image src={wavingHand} alt='hands' />
              </h5>
             </div>
            <div>
                <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='text-sm items-center font-semibold flex' aria-label='Customise options'>
                <span className='flex items-center rounded-full justify-center w-[30px] bg-slate-200 h-[30px]'>
                  <Image src={userImg} alt='profile' className='w-[25px] rounded-full h-[25px]' />
                </span>
              <span className='pl-1'>{'Investor'}</span>
              <i className='bi bi-chevron-down pl-1' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end'>
            <DropdownMenuItem
              className='cursor-pointer focus:bg-red-500 focus:text-white text-red-500'
              onClick={() => {
                router.push('/');
                sessionStorage.clear();
                localStorage.clear();
              }}
            >
              <i className='bi bi-box-arrow-in-left pr-1' /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            </div>
        </header>
        <section className="p-3">
          {children}
        </section>
      </main>
    </SidebarProvider>
  )
}

export default InvestorPageLayout