import { Review } from '@prisma/client';
import React from 'react';
import StarRender from '../../../search/components/StarRender';
import { calReviewRatingAverageFun } from '../../../../utils/calReviewRatingAverage';

const Rating = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div className="flex items-center">
            <div className="ratings mt-2 flex ">
                <StarRender rating={calReviewRatingAverageFun(reviews)} />
                <p className='text-reg ml-2'>{calReviewRatingAverageFun(reviews).toFixed(1)}</p>
            </div>

            <div className="text-reg pt-2 ml-4">
                {reviews.length > 0 ?
                    (<>{reviews.length} Review{reviews.length > 1 && 's'}</>)
                    :
                    "No reviews yet"}
            </div>
        </div>
    );
};

export default Rating;