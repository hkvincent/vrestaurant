import React from 'react'
import Hearder from './components/Hearder'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const fecthRestaurant = (city: string | undefined) => {
    const select = {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        slug: true,
        location: true,
        price: true,
    }
    console.log(city)

    if (city === "") return prisma.restaurant.findMany({ select });

    return prisma.restaurant.findMany(
        {
            where: {
                location: {
                    name: {
                        equals: city?.toLocaleLowerCase()
                    }

                }
            }
            ,
            select
        }
    )
}

const fecthLocations = () => {
    return prisma.location.findMany()
}

const fecthCuisines = () => {
    return prisma.cuisine.findMany()
}



export default async function search({ searchParams }: { searchParams: { city?: string, cuisine?: string, price?: PRICE } }) {
    const restaurants = await fecthRestaurant(searchParams.city);
    const locations = await fecthLocations();
    const cuisines = await fecthCuisines();


    return (
        <>
            {/* HEADER */}
            <Hearder />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                {/* SEARCH SIDE BAR */}
                <SearchSideBar
                    locations={locations}
                    cuisines={cuisines}
                    searchParams={searchParams}
                />
                {/* SEARCH SIDE BAR */}
                <div className="w-5/6">
                    {/* RESAURANT CAR */}
                    {
                        restaurants.length ? (
                            restaurants.map((restaurant) => (
                                <>
                                    <RestaurantCard
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                    />
                                </>
                            ))) : (
                            <div className="text-center text-2xl font-bold">
                                No restaurant found
                            </div>
                        )}
                    {/* RESAURANT CAR */}
                </div>
            </div>
        </>
    )
}
