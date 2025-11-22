'use client'
import React from 'react'
import Loader from './loader'

const PageLoader = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Loader />
    </div>
  )
}

export default PageLoader