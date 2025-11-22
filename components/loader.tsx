'use client'
import React from 'react'
import { SpinnerCustom } from './ui/spinner'

const Loader = ({width, height, size, color }: {
    width?: string, height?: string,
    size?: 4 | 8, color?: string
}) => {
  return (
    <div className={`flex ${
      width && height ? `${width} ${height}` : 'h-[200px] w-full'
    } items-center justify-center`}>
       <SpinnerCustom size={size} color={color} />
    </div>
  )
}

export default Loader