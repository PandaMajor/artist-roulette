import Image from "next/image"
import Vinyl from '../public/Vinyl.svg'
import Question from '../public/Question.svg'
import Note from '../public/Note.svg'
  
  export default function Header() {
    return (
      <div className="container flex flex-row mx-auto h-44">
        <div className="container flex flex-row justify-center mx-auto xl:mx-52">
            <div className="container flex flex-row items-center justify-start space-x-2">
                <Image src={Vinyl} alt='Vinyl icon' />
                <a className="text-2xl font-playfair hover:text-slate-900/80" href="#">ARTIST ROULETTE</a>
            </div>
            <div className="container flex flex-row justify-end space-x-16">
                <div className="container flex flex-row items-center justify-end space-x-1 text-base max-w-fit ">
                    <Image src={Question} alt='Question mark icon' />
                    <p className="font-sans">What is it?</p>
                </div>
                <div className="container flex flex-row items-center justify-end text-base max-w-fit">
                    <button className="container flex flex-row items-center justify-center space-x-1 border rounded-md border-slate-800/70 py-2.5 max-w-fit px-5 bg-white/90 shadow-black/40 shadow-md hover:bg-blueberry">
                      <Image src={Note} alt='Music note icon' />
                      <p className="font-sans font-bold">Get Started</p>
                    </button>
                </div>
            </div>
        </div>
      </div>
    )
  }
  