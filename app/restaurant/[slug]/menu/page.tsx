import React from 'react';
import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from '../components/Menu';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// interface RestaurantMenuPageProps {
//     items: {
//         name: string;
//         id            Int 
//         name          String
//         description   String
//         price         String
//         image         String?
//         restaurant_id Int

// }

const fetchItemsFromRestaurant = async (slug: string) => {
    const r = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            Items: true
        }
    })

    if (!r) throw new Error('Restaurant not found');

    return r.Items;
}

const restaurantMenuPage = async ({ params: { slug } }: { params: { slug: string } }) => {
    const items = await fetchItemsFromRestaurant(slug);

    return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
            {/* RESAURANT NAVBAR */}
            <RestaurantNavBar slug={slug} />
            {/* RESAURANT NAVBAR */} {/* MENU */}
            <Menu items={items} />
            {/* MENU */}
        </div>
    );
};

export default restaurantMenuPage;