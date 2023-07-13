import Link from 'next/link';
import React from 'react';
import { RestaurantCardType } from '../type';
import Price from './Price';
import StarRender from '../search/components/StarRender';
import { calReviewRatingAverage } from '../../utils/CalReviewRatingAverage';


interface RestaurantCardProps {
    restaurant: RestaurantCardType;
}


const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {


    const renderRatingText = () => {
        if (restaurant.reviews.length === 0) return 'No reviews yet';
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
        <div
            className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
        >
            <Link href={`/restaurant/${restaurant.slug}`}>
                <img
                    src={restaurant.main_image}
                    alt=""
                    className="w-full h-36"
                />
                <div className="p-1">
                    <h3 className="font-bold text-2xl mb-2">
                        {restaurant.name}
                    </h3>
                    <div className="flex items-start">
                        <div className="flex mb-2">
                            <StarRender rating={calReviewRatingAverage(restaurant.reviews)} />
                        </div>
                        <p className="ml-2">{restaurant.reviews.length} review{restaurant.reviews.length > 1 && 's'}</p>
                    </div>
                    <div className="flex text-reg font-light capitalize">
                        <p className=" mr-3">
                            {restaurant.cuisine.name}
                        </p>
                        <Price price={restaurant.price} />
                        <p>
                            {restaurant.location.name}
                        </p>
                    </div>
                    <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
                </div>
            </Link>
        </div>
    );
};

export default RestaurantCard;