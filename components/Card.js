import React from 'react'
import Track from './Track'
import Image from 'next/image'

const Card = ({artistPhoto, name, tracks}) => {
  return (
    <div className="container flex flex-row justify-center mx-auto">
      <div className="container flex flex-col justify-center w-4/5 p-4 my-32 sm:flex-row sm:w-2/3 sm:p-6 sm:mx-auto sm:space-x-10 xl:mx-52 bg-black/70 rounded-2xl">
      <div className="relative self-center overflow-hidden w-fill sm:w-1/2 h-fit">
        <Image 
            src={artistPhoto} 
            alt={name}
            width={640}
            height={640}
            cover='true'
            sizes='100vw'
            className='mb-2 rounded-lg sm:mb-0'
        />
      </div>
      <div className="container flex flex-col items-center justify-center my-auto w-fit sm:w-1/2 sm:mx-auto">
        <div className="text-lg font-bold text-white align-middle sm:text-3xl">{name}</div>
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