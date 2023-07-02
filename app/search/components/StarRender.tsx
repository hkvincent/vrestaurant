import React from 'react';

const StarRender = ({ rating }: { rating: number }) => {
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 !== 0;
    let grayStars = 5 - fullStars - (halfStar ? 1 : 0);
    // console.log({ fullStars, halfStar });
    return (
        <>
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 1l2.598 6.764h7.902l-6.39 4.932 2.4 6.804L10 13.236 3.49 19.5l2.4-6.804L0 7.764h7.902L10 1z"
                            clipRule="evenodd"
                        />
                    </svg>
                ))}
            {halfStar && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 1l2.598 6.764h7.902l-6.39 4.932 2.4 6.804L10 13.236 3.49 19.5l2.4-6.804L0 7.764h7.902L10 1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div style={{ position: 'absolute', top: 0, width: `${rating % 1 * 100}%`, overflow: 'hidden' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 1l2.598 6.764h7.902l-6.39 4.932 2.4 6.804L10 13.236 3.49 19.5l2.4-6.804L0 7.764h7.902L10 1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            )}
            {
                Array(grayStars)
                    .fill(0)
                    .map((_, index) => (
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 1l2.598 6.764h7.902l-6.39 4.932 2.4 6.804L10 13.236 3.49 19.5l2.4-6.804L0 7.764h7.902L10 1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ))
            }
        </>
    );
}

export default StarRender;