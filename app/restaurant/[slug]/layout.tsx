import React from 'react';
import Hearder from './components/Hearder';

const layout = ({ children, params }: {
    children: React.ReactNode,
    params: { slug: string };
}) => {
    return (
        <>
            <Hearder name = {params.slug}/>
            {/* HEADER */} {/* DESCRIPTION PORTION */}
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                {children}
            </div>
        </>
    );
};

export default layout;