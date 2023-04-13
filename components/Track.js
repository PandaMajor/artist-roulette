import React from 'react'
import Image from 'next/image'

const Track = ({cover, title, duration}) => {
  return (
    <div className="flex flex-row items-center w-full mx-auto space-x-4 border border-white">
        <div className="w-16 h-16 mr-5">
            <Image src={cover} width={64} height={64} className='rounded-lg' />
        </div>
        <p className="text-center text-white">{title}</p>
        <div className="mr-1 text-right text-white">{duration}</div>
    </div>
  )
}

export default Track