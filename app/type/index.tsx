
import {Cuisine, Location, PRICE, Review } from '@prisma/client';

export interface RestaurantCardType {
    id: number;
    name: string;
    cuisine: Cuisine;
    main_image: string;
    location: Location;
    price: PRICE;
    slug: string;
    reviews: Review[];
}