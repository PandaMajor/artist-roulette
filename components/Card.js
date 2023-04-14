import React from 'react'
import Track from './Track'
import Image from 'next/image'

const Card = ({artistPhoto, name, tracks}) => {
  return (
    <div className="container flex flex-row justify-center mx-auto">
      <div className="container flex flex-row justify-center w-2/3 p-6 mx-auto my-32 space-x-10 xl:mx-52 bg-black/70 rounded-2xl">
      <div className="relative self-center w-1/2 overflow-hidden h-fit">
        <Image 
            src={artistPhoto} 
            alt='photo of artist' 
            width={640}
            height={640}
            cover='true'
            sizes='100vw'
            className='rounded-lg'
        />
      </div>
      <div className="container flex flex-col items-center justify-center w-1/2 mx-auto my-auto">
        <div className="text-3xl font-bold text-white align-middle">{name}</div>
        <div className="mb-4 text-base text-white">Top Songs:</div>
        <svg width="480" height="2" viewBox="0 0 480 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="480" height="1" fill="white" fillOpacity="0.9"/>
        </svg>
        <div className="container flex flex-col w-full mt-8 space-y-1">
            <Track albumCover={tracks.albumCover} songTitle={tracks.songTitle} duration={tracks.duration} index={1}/>
            <Track albumCover={tracks.albumCover} songTitle={'Save Your Tears (Remix) (with Ariana Grande) - Bonus Track'} duration={tracks.duration} index={2}/>
            <Track albumCover={tracks.albumCover} songTitle={'7 Rings'} duration={tracks.duration} index={3}/>
            <Track albumCover={tracks.albumCover} songTitle={tracks.songTitle} duration={tracks.duration} index={4}/>
            <Track albumCover={tracks.albumCover} songTitle={tracks.songTitle} duration={tracks.duration} index={5}/>
        </div>
      </div>
    </div> 
  </div> 
  )
}

export default Card