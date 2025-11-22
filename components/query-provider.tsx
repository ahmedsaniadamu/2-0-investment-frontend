'use client'
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toastMessage } from '@/lib/custom-toast'
import { compareSync } from "bcryptjs";
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode
}
const QueryProvider: React.FC<Props> = ({ children }) => {

  const [queryClient] = useState<QueryClient>( () => new QueryClient() ) 
  const pathname = usePathname();

  const {push} = useRouter() 
  
  useEffect(() => {
    if(pathname.includes('/admin')){
       const user = sessionStorage.getItem('user');
       const userToken = sessionStorage.getItem('token');
       const role = sessionStorage.getItem('role');
       if(!user || !userToken || !role){
          toastMessage(
              'error',
             'Authentication Error!',
             'Error! You are not authenticated',
          )
         return push('/');
       }
       if(!compareSync(JSON.parse(user || '{}')?.role, role)){
          toastMessage('error',
             'Authorization Error!',
             'Error! You are not authorized',
          )
          return push('/login');
       }
      }
      if(pathname.includes('/investor')){
       const user = sessionStorage.getItem('user');
      const token = sessionStorage.getItem('token');
       if(!user && !token){
         toastMessage('error', 'Authentication Error!', 
          `Error! You are not authenticated`)
         return push('/login');
       }
      }
  }, [pathname])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider