import React from 'react';
import MenuCard from './MenuCard';
import { Item } from '@prisma/client';

const Menu = ({ items }: { items: Item[] }) => {
    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                {items.length > 0 ? (
                    <div className="flex flex-wrap justify-between">
                        {
                            items.map((item) => (
                                <MenuCard key={item.id} item={item} />
                            ))
                        }
                    </div>
                ) : (<p className="text-center">No items found</p>)}
            </div>
        </main>
    );
};

export default Menu;