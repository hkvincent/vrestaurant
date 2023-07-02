import React from 'react';
import Hearder from './components/Hearder';
import RestaurantNavBar from './components/RestaurantNavBar';
import Title from './components/Title';
import Rating from './components/Rating';
import Description from './components/Description';
import Images from './components/Images';
import Reviews from './components/Reviews';
import ReservationCard from './components/ReservationCard';
import { PrismaClient, Review } from '@prisma/client';


interface RestaurantDetailsPageProps {
    slug: string;
    id: number;
    name: string;
    images: string[];
    description: string;
    reviews: Review[];
}


const prisma = new PrismaClient();

const fecthRestaurantBySlug = async (slug: string): Promise<RestaurantDetailsPageProps> => {
    const r = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
        }
    })

    if (!r) throw new Error('Restaurant not found');

    return r;
}

const restaurantDetailspage = async ({ params: { slug } }: { params: { slug: string } }) => {
    const restaurant = await fecthRestaurantBySlug(slug);
    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                {/* RESAURANT NAVBAR */}
                <RestaurantNavBar slug={slug} />
                {/* RESAURANT NAVBAR */} {/* TITLE */}
                <Title name={restaurant.name} />
                {/* TITLE */} {/* RATING */}
                <Rating reviews={restaurant.reviews} />
                {/* RATING */} {/* DESCRIPTION */}
                <Description description={restaurant.description} />
                {/* DESCRIPTION */} {/* IMAGES */}
                <Images images={restaurant.images} />
                {/* IMAGES */} {/* REVIEWS */}
                <Reviews reviews={restaurant.reviews} />
                {/* REVIEWS */}
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard />
            </div>
        </>
    );
};

export default restaurantDetailspage;