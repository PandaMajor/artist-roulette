import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Card from '../components/Card'
import { useEffect, useState } from 'react'

const axios = require('axios').default;
const inter = Inter({ subsets: ['latin'] })

// TODO : UPDATE ENV VARS ON DEPLOYMENT

export default function Home() {
  const SPOTIFY_CLIENT_ID=process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const SPOTIFY_SECRET=process.env.NEXT_PUBLIC_SPOTIFY_SECRET
  const SPOTIFY_TOKEN_ENDPOINT=process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT

  const artists = ['4dpARuHxo51G3z768sgnrY', '1vCWHaC5f2uS3yhpwWbIA6', '3Nrfpe0tUJi4K4DXYWgMUX', '73sIBHcqh3Z3NyqHKZ7FOL', '4gzpq5DPGxSnKTe4SA8HAU', '5cj0lLjcoR7YOSnhnX0Po5', '3TVXtAsR1Inumwj472S9r4', '6M2wZ9GZgrQXHCFfjv46we', '5p7f24Rk5HkUZsaS3BLG5F', '53XhwfbYqKCa1cC15pYq2q', '4MCBfE4596Uoi2O4DtmEMz', '1uNFoZAHBGtllmzznpCI3s', '04gDigrS5kc9YWfZHwBETP', '2l35CQqtYRh3d8ZIiBep4v', '1McMsnEElThX1knmY4oliG', '5Pwc4xIPtQLFEnJriah9YJ', '246dkjvS1zLTtiykXe5h60', '5WUlDfRSoLAfcVSX1WnrxN', '6jeg7JBX9J9097esK752iR', '3AQRLZ9PuTAozP28Skbq8V', '6PfSUFtkMVoDkx4MQkzOi3', '4r63FhuTkUYltbVAg5TQnk', '07YZf4WDAMNwqr4jfgOZ8y', '31TPClRtHm23RisEBtV3X7', '2QsynagSdAqZj3U9HgDzjD', '5L1lO4eRHmJ7a0Q6csE5cT', '3WrFJ7ztbogyGnTHbHJFl2', '06HL4z0CvFAxyc27GXpf02', '1KCSPY1glIKqW2TotWuXOR', '3PhoLpVuITZKcymswpck5b', '3PALZKWkpwjRvBsRmhlVSS', '4UXqAaa6dQYAk18Lv7PEgX', '2xiIXseIJcq3nG7C8fHeBj', '12Chz98pHFMPJEknJQMWvI', '1RyvyyTE3xzB2ZywiAwp0i', '44vREmJC0OlVZjZaGLqVEd', '6vWDO969PvNqNYHIOW5v0m', '6XpaIBNiVzIetEPCWDvAFP', '34EP7KEpOjXcM2TCat1ISk', '3fMbdgg4jU18AjLCKBhRSm', '66CXWjxzNUsdJxJ2JdwvnR', '1Xyo4u8uXC1ZmMpatF05PJ', '21E3waRsmPlU7jZsS13rcj', '6jJ0s89eD6GaHleKKya26X', '5K4W6rqBFWDnAN6FQUkS6x', '6XyY86QOPPrYVGvF9ch6wz', '4lxfqrEsLX6N1N4OCSkILp', '5pKCCKE2ajJHZ9KAiaK11H', '2qxJFvFYMEDqd7ui6kSAcq', '2YZyLoL8N0Wb9xBt1NhZWg', '6deZN1bslXzeGvOLaLMOIF', '26dSoYclwsYLMAKD3tpOr4', '6LqNN22kT3074XbTVUrhzX', '0C8ZW7ezQVs4URX5aX7Kqx', '0TnOYISbd1XYRBk9myaseg', '1HY2Jd0NmPuamShAr6KMms', '2wUjUUtkb5lvLKcGKsKqsR', '4QQgXkCYTt3BlENzhyNETg', '5ZW7xLlj4bsIfjvUpNGEcs', '6S0dmVVn4udvppDhZIWxCr', '3ApUX1o6oSz321MMECyIYd', '7naAJDAh7AZnf18YYfQruM', '6fcTRFpz0yH79qSKfof7lp', '45eNHdiiabvmbp4erw26rg', '35l9BRT7MXmM8bv2WDQiyB', '07QEuhtrNmmZ0zEcqE9SF6', '6s22t5Y3prQHyaHWUN1R1C', '3fjs4zbBFxEFFe8Wyojo0G', '3dz0NnIZhtKKeXZxLOxCam', '6eUKZXaKkcviH0Ku9w2n3V', '0kX41bvrBQtgqSEXbmTzMN', '0iEtIxbK0KxaSlF7G42ZOp', '1anyVhU62p31KFi8MEzkbf', '5dhseP7KiICmkxT5waM1Md', '3iri9nBFs9e4wN7PLIetAw', '7dGJo4pcD2V6oG8kP0tJRR', '3MZsBdqDrRTJihTHQrO6Dq', '0du5cEVh5yTK9QJze8zA0C', '0B7Y5KDNScTBzeN7DY74YG', '3iNL7rw7fpmysjZvhB8vi7', '0X2BH1fck6amBIoJhDVmmJ', '74KM79TiuVKeVCqs8QtB0B', '4iHNK0tOyZPYnBU7nGAgpQ', '7n2Ycct7Beij7Dj7meI4X0', '74XFHRwlV6OrjEM0A2NCMF', '7tYKF4w9nC0nq9CsPZTHyP', '0EmeFodog0BfCgMzAIvKQp', '6qqNVTkY8uBg9cP3Jd7DAH', '2kxP07DLgs4xlWz8YHlvfh', '64M6ah0SkkRsnPGtGiRAbb', '0p4nmQO2msCgU4IF37Wi3j', '1l7ZsJRRS8wlW3WfJfPfNS', '3BmGtnKgCSGYIUhmivXKWX', '1U1el3k54VvEUzo3ybLPlM', '6sFIWsNpZYqfjUpaCgueju', '6mEQK9m2krja6X1cfsAjfl', '64tJ2EAv1R6UaZqc4iOCyj', '4DEItwf281SHmTnS8q3Mn9', '4oUHIQIBe0LHzYfvXNW4QM', '16oZKvXb6WkQlVAjwo2Wbg']

  const [token, setToken] = useState();
  const [artist, setArtist] = useState({photo: 'https://i.scdn.co/image/ab6761610000e5eb181a909eb13bbe013eeb7708', name: 'mystery singer'});
  const [tracks, setTracks] = useState([]);
  var topTracks = [];

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
      console.log('token : ' + token)
      return response.data.access_token
    })
  };

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
    const randArtist = Math.floor(Math.random() * 100);             // Get random artist

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
      console.log('token : ' + token)

      // Get artist name + photo
      axios.get('https://api.spotify.com/v1/artists/' + artists[randArtist], {
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
      axios.get('https://api.spotify.com/v1/artists/' + artists[randArtist] + '/top-tracks?market=US', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          market: 'US'
        }
      })
      .then((response: any) => {
        let topTracks = []

        for(const element of response.data.tracks){
          console.log('\t' + element.name)
          topTracks.push({
            albumCover: element.album.images[2].url,
            songTitle: element.name,
            duration: millisToMinutesAndSeconds(element.duration_ms),
            key: tracks.length + 1
          });
          // setTracks([]);
        }
        console.log(topTracks)
        setTracks(topTracks);
        console.log(tracks)
      })
      .catch((error: any) => {
        console.log(error)
      })

    })
    .catch((error: any) => {
      console.log(error)
    })

    // var { data } = await axios.get('https://api.spotify.com/v1/artists/' + artists[randArtist], {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   },
    //   params: {}
    // })

    // setArtist({
    //   photo: data.images[0].url,
    //   name: data.name
    // })

    
    
    // Get the top tracks
    // var {data} = await axios.get('https://api.spotify.com/v1/artists/' + artists[randArtist] + '/top-tracks?market=US', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   },
    //   params: {
    //     market: 'US'
    //   }
    // })

    // console.log(data.data.tracks)

    // for(const element of data.data.tracks){
    //   console.log('\t' + element.name)
    //   topTracks.push({
    //     albumCover: element.album.images[2].url,
    //     songTitle: element.name,
    //     duration: millisToMinutesAndSeconds(element.duration_ms),
    //     key: tracks.length + 1
    //   })
    //   setTracks([]);
    //   // setTracks([
    //   //   ...tracks, 
    //   //   {
    //   //     albumCover: element.album.images[2].url,
    //   //     songTitle: element.name,
    //   //     duration: millisToMinutesAndSeconds(element.duration_ms),
    //   //     index: tracks.length + 1
    //   //   }]);
    // }

    // console.log('tracks is')
    // console.log(tracks)
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
            <a className="font-sans font-bold underline hover:text-slate-600" onClick={getAccessToken}>Test your luck</a>
          </div>
        </div>
      </div>
      <Card artistPhoto={ artist.photo } name={ artist.name } tracks={tracks} />
      <div className="w-full h-full py-12 text-center bg-white/30">bottom</div>
    </main>
  )
}
