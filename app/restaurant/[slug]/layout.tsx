import React from 'react';
import Hearder from './components/Hearder';

const layout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Hearder />
            {/* HEADER */} {/* DESCRIPTION PORTION */}
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                {children}
            </div>
        </>
    );
};

export default layout;