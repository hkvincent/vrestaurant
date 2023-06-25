import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Header />
      {/* CARDS */}
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {/* CARD */}
        <RestaurantCard />
        {/* CARD */}
      </div>
      {/* CARDS */}
    </main>
  )
}
