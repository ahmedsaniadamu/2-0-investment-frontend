import React from 'react'
import EmptyImage from '@/assets/empty-data.png'
import Image from 'next/image'

const EmptyData = ({width, height, text}: {width?: string, height?: string, text?: string}) => {
  return (
    <div className='w-full flex flex-col justify-center gap-0 h-auto'>
        <div className='flex justify-center items-ccenter'>
             <Image 
               className={` block ${width && height ? `${width} ${height}` : 'h-[200px] w-[200px]'}`} 
             src={EmptyImage}  alt="Empty Data" 
             />
        </div>
        <div className={`flex items-center justify-center`}>
            <span className='text-sm text-gray-500'>{text}</span>
        </div>
    </div>
  )
}

export default EmptyData