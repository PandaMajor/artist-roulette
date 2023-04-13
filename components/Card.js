import React from 'react'
import Track from './Track'
import Cover from '../assets/cover.png'
import Image from 'next/image'

const Card = ({artist}) => {
  return (
    <div className="container flex flex-row justify-center mx-auto">
      <div className="container flex flex-row justify-center w-2/3 p-6 mx-auto mt-32 space-x-12 xl:mx-52 bg-black/70 rounded-2xl">
      <div className="relative self-center w-full h-full overflow-hidden">
        <Image 
            src={artist} 
            alt='photo of artist' 
            cover 
            sizes='100vw'
            className='rounded-lg'
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full mx-auto my-4">
        <div className="text-lg font-bold text-white align-middle">ARIANA GRANDE</div>
        <div className="mb-4 text-base text-white">Top Songs:</div>
        <svg width="480" height="2" viewBox="0 0 480 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="480" height="1" fill="white" fill-opacity="0.9"/>
        </svg>
        <div className="flex flex-col mt-8 space-y-1 w-fit">
            <Track cover={Cover} title={"Die For You (with Ariana Grande) - Remix"} duration={"3:52"}/>
            <Track cover={Cover} title={"7 Rings"} duration={"3:22"}/>
            <Track cover={Cover} title={"Die For You (with Ariana Grande) - Remix"} duration={"3:52"}/>
            <Track cover={Cover} title={"Die For You (with Ariana Grande) - Remix"} duration={"3:52"}/>
            <Track cover={Cover} title={"Die For You (with Ariana Grande) - Remix"} duration={"3:52"}/>
        </div>
      </div>
    </div> 
  </div> 
  )
}

export default Card