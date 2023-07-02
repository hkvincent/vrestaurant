import { Review } from '@prisma/client';
import React from 'react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                {reviews.length > 0 ? (
                    <p>
                        What {reviews.length} {reviews.length > 1 ? "people" : "person"} are saying
                    </p>
                ) : "No reviews yet"}

            </h1>
            <div>
                {/* REVIEW CARD */}
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
                {/* REVIEW CARD */}
            </div>
        </div>
    );
};

export default Reviews;