import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Card from '../components/Card'
import Cover from '../assets/cover.png'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [artist, setArtist] = useState({});

  function handleArtist() {
    setArtist({
      photo: 'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952',
      name: 'Test Name 2'
    })
    console.log(artist)
  }

  var ariana = {
    photo: 'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952',
    name: 'Ariana Grande'
  }
  var tracks = {
    albumCover: 'https://i.scdn.co/image/ab67616d000048518ad8f5243d6534e03b656c8b',
    songTitle: 'Die For You (with Ariana Grande) - Remix',
    duration: '3:52'
  }
  return (
    <main className={inter.className}>
      <Header />
      <div className="container flex flex-row justify-center w-auto mx-auto mt-8">
        <div className="container flex flex-col space-y-6">
          <div className="flex flex-row justify-center">
            <p className="font-sans font-medium">WELCOME TO</p>
          </div>
          <div className="flex flex-row justify-center">
            <p className="font-sans text-4xl font-bold">ARTIST ROULETTE</p>
          </div>
          <div className="flex flex-row justify-center">
            <p className="font-sans font-medium">its like beanboozled but for music</p>
          </div>
          <div className="flex flex-row justify-center space-x-2.5 items-center">
            <button className='px-2.5 border bg-white/90 rounded-lg max-w-fit py-1.5 hover:bg-blueberry hover:border-slate-900/70' onClick={handleArtist}>
              <p className="font-bold">Who am I stanning next?</p>
            </button>
            <a className="font-sans font-bold underline hover:text-slate-600" href='#'>Test your luck</a>
          </div>
        </div>
      </div>
      <Card artistPhoto={ariana.photo} name={ariana.name} tracks={tracks} />
      <div className="w-full h-full py-12 text-center bg-white/30">bottom</div>
    </main>
  )
}
