import React from 'react'
import Image from 'next/image'

const Track = ({albumCover, songTitle, duration, index}) => {
  return (
    <div className={`flex flex-row items-center w-full mx-auto space-x-2 rounded-lg ${ index % 2 === 0 ? 'bg-dark-bg' : 'bg-light-bg' }`}>
        <div className="w-16 h-16 mr-auto xl:mr-4">
            <Image 
              src={albumCover}
              alt='album cover art'
              width={64}
              height={64}
              cover='true'
              className='w-16 h-16 rounded-lg' />
        </div>
        <div className="justify-start w-auto xl:w-80 truncate ... text-ellipsis">
          <p className=" text-white truncate ... text-ellipsis">{songTitle}</p>
        </div>
        <div className="justify-end pr-2 mr-1 text-white">{duration}</div>
    </div>
  )
}

export default Track