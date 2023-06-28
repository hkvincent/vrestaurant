import React from 'react';
import { Cuisine, Location, PRICE } from '@prisma/client';
const Price = ({ price }: { price: PRICE }) => {


    const renderPrice = () => {
        switch (price) {
            case PRICE.CHEAP:
                return (
                    <>
                        <span>$$</span><span className="text-gray-400">$$</span>
                    </>
                );
            case PRICE.REGULAR:
                return (
                    <>
                        <span>$$$</span><span className="text-gray-400">$</span>
                    </>
                );
            case PRICE.EXPENSIVE:
                return (
                    <>
                        <span>$$$$</span>
                    </>
                );
        }
    }
    return (
        <p className="text-red-400 font-mono mr-3 flex">
            {renderPrice()}
        </p>
    );
};

export default Price;