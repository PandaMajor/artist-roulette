import React from 'react'
import Track from './Track'
import Image from 'next/image'

const Card = ({artistPhoto, name, tracks}) => {
  return (
    <div className="container flex flex-row justify-center mx-auto">
      <div className="container flex flex-col sm:flex-row justify-center w-4/5 sm:w-2/3 sm:p-6 sm:mx-auto my-32 p-4 sm:space-x-10 xl:mx-52 bg-black/70 rounded-2xl">
      <div className="relative self-center w-fill sm:w-1/2 overflow-hidden h-fit">
        <Image 
            src={artistPhoto} 
            alt={name}
            width={640}
            height={640}
            cover='true'
            sizes='100vw'
            className='rounded-lg mb-2 sm:mb-0'
        />
      </div>
      <div className="container flex flex-col items-center justify-center w-fit sm:w-1/2 sm:mx-auto my-auto">
        <div className="text-lg sm:text-3xl font-bold text-white align-middle">{name}</div>
        <div className="mb-4 text-base text-white">Top Songs:</div>
        <svg width="480" height="2" viewBox="0 0 480 2" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-full'>
        <rect y="0.5" width="480" height="1" fill="white" fillOpacity="0.9"/>
        </svg>
        <div className="container flex flex-col w-full mt-8 space-y-1">
          {
            tracks.map((track, i) => (
              <Track albumCover={track.albumCover} songTitle={track.songTitle} duration={track.duration} index={track.index} key={i}/>
            ))
          }
        </div>
      </div>
    </div> 
  </div> 
  )
}

export default Card