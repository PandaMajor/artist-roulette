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

  let artists = [
    '4dpARuHxo51G3z768sgnrY', '1vCWHaC5f2uS3yhpwWbIA6', '3Nrfpe0tUJi4K4DXYWgMUX', '4gzpq5DPGxSnKTe4SA8HAU', '5cj0lLjcoR7YOSnhnX0Po5', '3TVXtAsR1Inumwj472S9r4', '6M2wZ9GZgrQXHCFfjv46we', '53XhwfbYqKCa1cC15pYq2q', '4MCBfE4596Uoi2O4DtmEMz', '1uNFoZAHBGtllmzznpCI3s', '04gDigrS5kc9YWfZHwBETP', '2l35CQqtYRh3d8ZIiBep4v', '1McMsnEElThX1knmY4oliG', '5WUlDfRSoLAfcVSX1WnrxN', '6jeg7JBX9J9097esK752iR', '3AQRLZ9PuTAozP28Skbq8V', '6PfSUFtkMVoDkx4MQkzOi3', '4r63FhuTkUYltbVAg5TQnk', '07YZf4WDAMNwqr4jfgOZ8y', '31TPClRtHm23RisEBtV3X7', '2QsynagSdAqZj3U9HgDzjD', '3WrFJ7ztbogyGnTHbHJFl2', '06HL4z0CvFAxyc27GXpf02', '1KCSPY1glIKqW2TotWuXOR', '3PALZKWkpwjRvBsRmhlVSS', '1RyvyyTE3xzB2ZywiAwp0i', '44vREmJC0OlVZjZaGLqVEd', '6vWDO969PvNqNYHIOW5v0m', '3fMbdgg4jU18AjLCKBhRSm', '66CXWjxzNUsdJxJ2JdwvnR', '1Xyo4u8uXC1ZmMpatF05PJ', '21E3waRsmPlU7jZsS13rcj', '6jJ0s89eD6GaHleKKya26X', '5K4W6rqBFWDnAN6FQUkS6x', '4lxfqrEsLX6N1N4OCSkILp', '5pKCCKE2ajJHZ9KAiaK11H', '2qxJFvFYMEDqd7ui6kSAcq', '2YZyLoL8N0Wb9xBt1NhZWg', '6deZN1bslXzeGvOLaLMOIF', '26dSoYclwsYLMAKD3tpOr4', '6LqNN22kT3074XbTVUrhzX', '0C8ZW7ezQVs4URX5aX7Kqx', '0TnOYISbd1XYRBk9myaseg', '1HY2Jd0NmPuamShAr6KMms', '2wUjUUtkb5lvLKcGKsKqsR', '4QQgXkCYTt3BlENzhyNETg', '7eGJeQTIqcNgSTn7x5tIse', '3ApUX1o6oSz321MMECyIYd', '7naAJDAh7AZnf18YYfQruM', '6fcTRFpz0yH79qSKfof7lp', '35l9BRT7MXmM8bv2WDQiyB', '07QEuhtrNmmZ0zEcqE9SF6', '3dz0NnIZhtKKeXZxLOxCam', '6eUKZXaKkcviH0Ku9w2n3V', '0kX41bvrBQtgqSEXbmTzMN', '1anyVhU62p31KFi8MEzkbf', '5dhseP7KiICmkxT5waM1Md', '3iri9nBFs9e4wN7PLIetAw', '7dGJo4pcD2V6oG8kP0tJRR', '3MZsBdqDrRTJihTHQrO6Dq', '0du5cEVh5yTK9QJze8zA0C', '0B7Y5KDNScTBzeN7DY74YG', '3iNL7rw7fpmysjZvhB8vi7', '0X2BH1fck6amBIoJhDVmmJ', '74KM79TiuVKeVCqs8QtB0B', '4iHNK0tOyZPYnBU7nGAgpQ', '7n2Ycct7Beij7Dj7meI4X0', '7tYKF4w9nC0nq9CsPZTHyP', '0EmeFodog0BfCgMzAIvKQp', '6qqNVTkY8uBg9cP3Jd7DAH', '64M6ah0SkkRsnPGtGiRAbb', '0p4nmQO2msCgU4IF37Wi3j', '1l7ZsJRRS8wlW3WfJfPfNS', '3BmGtnKgCSGYIUhmivXKWX', '1U1el3k54VvEUzo3ybLPlM', '6sFIWsNpZYqfjUpaCgueju', '64tJ2EAv1R6UaZqc4iOCyj', '4DEItwf281SHmTnS8q3Mn9', '4oUHIQIBe0LHzYfvXNW4QM', '16oZKvXb6WkQlVAjwo2Wbg']

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
    console.log('random number is ' + randArtist)
    console.log(list[randArtist].available)
    while(!list[randArtist].available) {
      randArtist = Math.floor(Math.random() * list.length)
      console.log('artist is ' + list[randArtist].artist)
    }

    e.preventDefault()                                              // Don't redirect page

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
        delete artists[randArtist]
      })
      .catch((error: any) => {
        console.log(error)
      })
    })
    .catch((error: any) => {
      console.log(error)
    })
  }

  function getAvailableArtists() {
    let res = 0
    for(let i = 0; i < list.length; i++){
      list[i].available ? res++ : res
    }
    return res
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
            <div className="flex flex-col sm:flex-row justify-center sm:space-x-2.5 space-y-2.5 items-baseline">
              <button className='px-2.5 border bg-white/90 rounded-lg max-w-fit py-1.5 hover:bg-blueberry hover:border-slate-900/70' onClick={getArtist}>
                <p className="font-bold">Who am I stanning next?</p>
              </button>
              <a className="font-sans font-bold underline hover:text-slate-600" onClick={getAccessToken} href='#'>Test your luck</a>
            </div>
          </div>
        </div>
        <Card artistPhoto={ artist.photo } name={ artist.name } tracks={ tracks } />
        <div className="w-full h-full py-12 text-center">
          <h1 className="font-sans text-4xl font-bold">
            THE POOL
          </h1>
          <p className='my-4'>The chance to get any artist is { (1 / getAvailableArtists()) * 100 }%</p>
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
                      <td className='w-1/3 p-3'>{item.artist}</td>
                      <td className='w-1/3 p-3'>{item.avg_rating}</td>
                      <td className={`w-1/3 p-3 ${ item.available ? 'text-green-500' : 'text-red-500' }`}>{item.available.toString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>  
        </div>
      </main>
    </div>
  )
}
