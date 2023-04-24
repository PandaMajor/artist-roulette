import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const axios = require('axios').default;
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const SPOTIFY_CLIENT_ID=process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const SPOTIFY_SECRET=process.env.NEXT_PUBLIC_SPOTIFY_SECRET
  const SPOTIFY_TOKEN_ENDPOINT=process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT

  const db = collection(database, 'artists_list')

  const [token, setToken] = useState();
  const [artist, setArtist] = useState({photo: 'https://i.scdn.co/image/ab6761610000e5eb181a909eb13bbe013eeb7708', name: 'mystery artist'});
  const [tracks, setTracks] = useState([] as any);
  const [list, setList] = useState([] as any)

  const getArtistList = () => {
    getDocs(db)
      .then((data) => {
        setList(data.docs.map((item) => {
          return { ...item.data(), id: item.id }
        }))
      })
  }

  useEffect(() => {
    getArtistList();
  }, [])

  // get spotify api access token
  const getAccessToken = async () => {
    axios.post(SPOTIFY_TOKEN_ENDPOINT!, {
      client_id: SPOTIFY_CLIENT_ID!,
      client_secret: SPOTIFY_SECRET!,
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response: any) {
      setToken(response.data.access_token)
      return response.data.access_token
    })
  };

  // Get the access token on load, no longer need to click 'Test your luck' first
  useEffect(() => {
    getAccessToken();
  }, [])

  // Used to convert the duration from ms to "minutes : seconds" format
  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
      Number(seconds) === 60 ?
      (minutes+1) + ":00" :
      minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
    );
  }

  // Spotify API Calls
  const getArtist = async (e: { preventDefault: () => void }) => {
    let randArtist = Math.floor(Math.random() * list.length);             // Get random artist

    while(!list[randArtist].available) {                                  // Ensure that the artist is valid
      randArtist = Math.floor(Math.random() * list.length)
    }

    e.preventDefault()                                                    // Don't redirect page

    axios.post(SPOTIFY_TOKEN_ENDPOINT!, {
      client_id: SPOTIFY_CLIENT_ID!,
      client_secret: SPOTIFY_SECRET!,
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response: any) {
      setToken(response.data.access_token)

      // Get artist name + photo
      axios.get('https://api.spotify.com/v1/artists/' + list[randArtist].spotify_id, {
        headers: {
              Authorization: `Bearer ${token}`
        }
      })
      .then((response: any) => {
        setArtist({
          photo: response.data.images[0].url,
          name: response.data.name
        })
      })
      .catch((error: any) => {
        console.log(error)
      })

      // get artist top tracks
      axios.get('https://api.spotify.com/v1/artists/' + list[randArtist].spotify_id + '/top-tracks?market=US', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          market: 'US'
        }
      })
      .then((response: any) => {
        let topTracks:any[] = []

        for(const element of response.data.tracks){
          if (topTracks.length < 5){                                      // limit top tracks to 5, (default is 10)
            topTracks.push({
              albumCover: element.album.images[2].url,
              songTitle: element.name,
              duration: millisToMinutesAndSeconds(element.duration_ms),
              index: topTracks.length + 1
            });
          }
          // console.log('\t' + element.name)
        }
        setTracks(topTracks);
      })
      .catch((error: any) => {
        console.log(error)
      })
    })
    .catch((error: any) => {
      console.log(error)
    })
  }

  // counts the number of artists that are available
  function getAvailableArtists() {
    let res = 0
    for(let i = 0; i < list.length; i++){
      list[i].available ? res++ : res
    }
    // console.log('number of available artists is ' + res)
    return res
  }

  // gets the ratio of low ranked artists to rest of them
  function getRatio() {
    const total = getAvailableArtists();
    let jokers = 0
    for(let i = 0; i < list.length; i++) {
      parseFloat(list[i].avg_rating) <= 3.0 && list[i].available ? jokers++ : null
    }
    return jokers / total
  }

  return (
    <div>
      <Head>
        <title>Artist Roulette</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
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
            <div className="flex flex-col sm:flex-row justify-center sm:space-x-2.5 space-y-2.5 items-center xl:items-baseline">
              <button className='px-2.5 border bg-white/90 rounded-lg max-w-fit py-1.5 hover:bg-blueberry hover:border-slate-900/70' onClick={getArtist}>
                <p className="font-bold">Who am I stanning next?</p>
              </button>
              <a className="font-sans font-bold underline hover:text-slate-600" onClick={getAccessToken} href='#'>Test your luck</a>
            </div>
          </div>
        </div>
        <Card artistPhoto={ artist.photo } name={ artist.name } tracks={ tracks } />
        <div className="w-full h-full text-center">
          <div className="flex flex-col my-20 space-y-4">
            <h1 className="font-sans text-4xl font-bold">
              THE POOL
            </h1>
            <p>The chance to get any artist is { Math.round(1 / getAvailableArtists() * 1000)/10 }%</p>
            <p className='text-sm italic'>The chance to get a funny artist is { Math.round(getRatio() * 1000)/10 }%</p>
            <div className='w-3/5 mx-auto'>
              <table className='w-full text-left'>
                <caption className="p-1 text-sm text-left text-gray-800">List of artists</caption>
                  <thead className='flex w-full text-white rounded-t-lg bg-black/80'>
                    <tr className='flex w-full py-1'>
                      <th className='w-1/3 p-3'>Artist</th>
                      <th className='w-1/3 p-3'>Rating</th>
                      <th className='w-1/3 p-3'>Available</th>
                    </tr>
                  </thead>
                <tbody className='flex flex-col items-center justify-between w-full h-64 overflow-y-scroll rounded-b-lg bg-black/60'>
                  { list.map((item: any, i: any) => {
                    return (
                      <tr key={i} className='flex w-full h-full text-white even:bg-light-bg odd:bg-dark-bg'>
                        <td className='w-1/3 p-3'>{ item.artist }</td>
                        <td className='w-1/3 p-3'>{ Math.round(item.avg_rating * 10) /10 }</td>
                        <td className={`w-1/3 p-3 ${ item.available ? 'text-green-500' : 'text-red-500' }`}>{ item.available.toString() }</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
