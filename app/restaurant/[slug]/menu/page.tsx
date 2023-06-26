import React from 'react';
import Hearder from '../components/Hearder';
import RestaurantCard from '../../../components/RestaurantCard';
import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from '../components/Menu';

const restaurantMenuPage = () => {
    return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
            {/* RESAURANT NAVBAR */}
            <RestaurantNavBar />
            {/* RESAURANT NAVBAR */} {/* MENU */}
            <Menu />
            {/* MENU */}
        </div>
    );
};

export default restaurantMenuPage;