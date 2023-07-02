"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SearchBar = () => {
    const router = useRouter();
    const [location, setLocation] = useState("");

    const handleSearch = () => {
        if (location === "") return alert("Please enter a location");
        router.push(`/search?city=${location}`);
        setLocation("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
                className="rounded-xl  mr-3 p-2 w-[450px]"
                type="text"
                placeholder="State, city or town"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="rounded-xl bg-green-600 px-9 py-2 text-white"
                onClick={handleSearch}
            >
                Let's go
            </button>
        </div>
    );
};


export default SearchBar;