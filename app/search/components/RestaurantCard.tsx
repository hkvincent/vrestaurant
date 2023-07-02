import { Cuisine, PRICE, Location, Review } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import Price from '../../components/Price';
import { calReviewRatingAverage } from '../../../utils/calReviewRatingAverage';
import StarRender from './StarRender';


interface RestaurantCardProps {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[];
}

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantCardProps }) => {

    const renderRatingText = () => {
        if (restaurant.reviews.length === 0) return 'No reviews yet';
        console.log(calReviewRatingAverage(restaurant.reviews) + ' ' + restaurant.name)
        const rating = calReviewRatingAverage(restaurant.reviews);
        if (rating < 2) {
            return 'Awful';
        }
        if (rating < 3) {
            return 'Mediocre';
        }
        if (rating < 4) {
            return 'Good';
        }
        if (rating < 4.5) {
            return 'Very Good';
        }
        return 'Awesome';
    };


    return (

        <div className="border-b flex pb-5 ml-4">
            <Link href={`/restaurant/${restaurant.slug}`} className='flex items-end justify-center'>
                <img
                    src={restaurant.main_image}
                    alt=""
                    className="w-56 rounded h-36 "
                />
            </Link>
            <div className="pl-5">
                <Link href={`/restaurant/${restaurant.slug}`}> <h2 className="text-3xl">{restaurant.name}</h2> </Link>
                <div className="flex items-start">
                    <div className="flex mb-2">{
                        //redner rating according to the average rating, also display half of the star
                        // calReviewRatingAverage(restaurant.reviews) > 0 ?
                        //     Array(Math.round(calReviewRatingAverage(restaurant.reviews))).fill(0).map((_, index) => (
                        //         <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        //             <path
                        //                 fillRule="evenodd"
                        //                 d="M10 1l2.598 6.764h7.902l-6.39 4.932 2.4 6.804L10 13.236 3.49 19.5l2.4-6.804L0 7.764h7.902L10 1z"
                        //                 clipRule="evenodd"
                        //             />
                        //         </svg>
                        //     )) :
                        //     Array(1).fill(0).map((_, index) => (
                        //         <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        //             <path
                        //                 fillRule="evenodd"
                        //                 d="M10 1l2.598 6.764h7.902l-6.39 4.932 2.4 6.804L10 13.236 3.49 19.5l2.4-6.804L0 7.764h7.902L10 1z"
                        //                 clipRule="evenodd"
                        //             />
                        //         </svg>
                        //     ))
                        <StarRender rating={calReviewRatingAverage(restaurant.reviews)} />
                    }</div>
                    <p className="ml-2 text-sm">{renderRatingText()}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price} />
                        <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
                        <p className="mr-4 capitalize">{restaurant.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href={`/restaurant/${restaurant.slug}`}> View more information </Link>
                </div>
            </div>
        </div>

    );
};

export default RestaurantCard;