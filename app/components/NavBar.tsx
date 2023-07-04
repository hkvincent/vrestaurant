import Link from 'next/link';
import React from 'react';
import AuthModal from './AuthModal';

const NavBar = () => {
    return (
        <nav className="bg-white p-2 flex justify-between min-w-max">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                V Table System
            </Link>
            <div>
                <div className="flex">
                    <AuthModal isSignin={true} />
                    <AuthModal isSignin={false} />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;