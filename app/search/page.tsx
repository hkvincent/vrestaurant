import React from 'react'
import Hearder from './components/Hearder'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface SearchParams {
    city?: string,
    cuisine?: string,
    price?: PRICE
}

const fecthRestaurant = (searchParams: SearchParams) => {
    const where: any = {}
    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLocaleLowerCase()
            }
        }
        where.location = location;
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLocaleLowerCase()
            }
        }
        where.cuisine = cuisine;
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price;
    }

    const select = {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        slug: true,
        location: true,
        price: true,
        reviews: true,
    }
    return prisma.restaurant.findMany(
        {
            where
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



export default async function search({ searchParams }: { searchParams: SearchParams }) {
    const restaurants = await fecthRestaurant(searchParams);
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
