"use client";
import React, { useState } from 'react';

const Images = ({ images }: { images: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (image: string) => {
        setIsOpen(true);
        setSelectedImage(image);
    }

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
            setSelectedImage('');
        }
    }

    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                {images.length} Photo{images.length > 1 && 's'}
            </h1>
            <div className="flex flex-wrap">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className="w-56 h-44 mr-1 mb-1 cursor-pointer"
                        src={image}
                        alt=""
                        onClick={() => openModal(image)}
                    />
                ))}
            </div>
            {isOpen && (
                <div onClick={closeModal} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-3 rounded shadow-lg relative">
                        <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-start justify-center">X</button>
                        <img
                            className="w-full h-auto"
                            src={selectedImage}
                            alt=""
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Images;