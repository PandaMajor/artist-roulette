import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Card from '../components/Card'
import { useEffect, useState } from 'react'

const axios = require('axios').default;
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const SPOTIFY_CLIENT_ID=process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const SPOTIFY_REDIRECT_URI=process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI
  const SPOTIFY_AUTH_ENDPOINT=process.env.NEXT_PUBLIC_SPOTIFY_AUTH_ENDPOINT
  const SPOTIFY_RESPONSE_TYPE=process.env.NEXT_PUBLIC_SPOTIFY_RESPONSE_TYPE

  const [token, setToken] = useState('');
  const [artist, setArtist] = useState({photo: 'https://i.scdn.co/image/ab6761610000e5eb181a909eb13bbe013eeb7708', name: 'mystery singer'});
  const [tracks, setTracks] = useState([]);
  var topTracks = [];

  // Used to convert the duration from ms to "minutes : seconds" format
  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
      seconds == 60 ?
      (minutes+1) + ":00" :
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  }

  // Perform Spotify OAuth to get the access token
  useEffect(() => {
    const hash = window.location.hash
    let token:string = window.localStorage.getItem('token')!                                                    // used to assure ts that token is not null 

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1] ?? ''   // nullish coalescing operator

      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }
    setToken(token)
  }, [])

  // Logout, deletes the OAuth token
  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  // Spotify API Calls
  const getArtist = async (e: { preventDefault: () => void }) => {
    console.log('button pressed')
    e.preventDefault()
    var { data } = await axios.get('https://api.spotify.com/v1/artists/74KM79TiuVKeVCqs8QtB0B', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {}
    })

    setArtist({
      photo: data.images[0].url,
      name: data.name
    })
    
    // Get the top tracks
    data = await axios.get('https://api.spotify.com/v1/artists/74KM79TiuVKeVCqs8QtB0B/top-tracks?market=US', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        market: 'US'
      }
    })

    console.log(data.data.tracks)

    for(const element of data.data.tracks){
      console.log('\t' + element.name)
      topTracks.push({
        albumCover: element.album.images[2].url,
        songTitle: element.name,
        duration: millisToMinutesAndSeconds(element.duration_ms),
        key: tracks.length + 1
      })
      setTracks([
        ...tracks, 
        {
          albumCover: element.album.images[2].url,
          songTitle: element.name,
          duration: millisToMinutesAndSeconds(element.duration_ms),
          index: tracks.length + 1
        }]);
    }

    //setTracks(topTracks);
    console.log('tracks is')
    console.log(tracks)
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
            <button className='px-2.5 border bg-white/90 rounded-lg max-w-fit py-1.5 hover:bg-blueberry hover:border-slate-900/70' onClick={getArtist}>
              <p className="font-bold">Who am I stanning next?</p>
            </button>
            <a className="font-sans font-bold underline hover:text-slate-600" href='#'>Test your luck</a>
          </div>
          { !token ? 
            <div className="flex flex-row justify-center space-x-2 items-center">
              <button className='bg-slate-900/90 hover:bg-slate-900/80 rounded-lg px-4 py-2'>
                <a 
                  href={`${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&response_type=${SPOTIFY_RESPONSE_TYPE}`}
                  className='text-green-500 hover:text-green-400 font-sans'>
                  Login to Spotify
                </a>
              </button>
              <p className="font-sans font-normal text-slate-900/70">*requires linking Spotify to get artist information</p>
            </div> 
            :
            <div className="flex flex-row justify-center space-x-2 items-center">
              <button 
                className='bg-slate-900/90 hover:bg-slate-900/80 rounded-lg px-4 py-2 text-white font-sans font-semibold'
                onClick={logout}>
                Logout
              </button>
              <p className="font-sans font-normal text-slate-900/70">Successfully authenticated!</p>
            </div>
          }
        </div>
      </div>
      <Card artistPhoto={ artist.photo } name={ artist.name } tracks={tracks} />
      <div className="w-full h-full py-12 text-center bg-white/30">bottom</div>
    </main>
  )
}
