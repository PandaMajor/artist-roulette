import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Card from '../components/Card'
import Artist from '../assets/artist.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
            <button className='px-2.5 border bg-white/90 rounded-lg max-w-fit py-1.5 hover:bg-blueberry hover:border-slate-900/70'>
              <p className="font-bold">Who am I stanning next?</p>
            </button>
            <a className="font-sans font-bold underline hover:text-slate-600" href='#'>Test your luck</a>
          </div>
        </div>
      </div>
      <Card artist={Artist}/>
      <div className="mb-12">bottom</div>
    </main>
  )
}
