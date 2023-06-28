import { Inter } from '@next/font/google'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { PrismaClient } from '@prisma/client'
import { RestaurantCardType } from './type'

const inter = Inter({ subsets: ['latin'] })

const prisma = new PrismaClient();

const fecthRestaurant = async (): Promise<RestaurantCardType[]> => {
  const data = await prisma.restaurant.findMany(
    {
      select: {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        slug: true,
        location: true,
        price: true,
      }
    }
  )
  return data;
}

export default async function Home() {

  const restaurants = await fecthRestaurant();
  console.log(restaurants);

  return (
    <main>
      <Header />
      {/* CARDS */}
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {/* CARD */}

        {restaurants.map((restaurant) => (
          <RestaurantCard 
            restaurant={restaurant}
          />
        ))}

        {/* CARD */}
      </div>
      {/* CARDS */}
    </main>
  )
}
