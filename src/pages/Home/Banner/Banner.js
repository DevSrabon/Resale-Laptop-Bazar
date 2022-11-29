import React from 'react';
import './Banner.css'
const Banner = () => {
    return (
        <div className='banner flex justify-center items-center gap-5 flex-col h-[500px]'>
            <h2 className='text-3xl lg:text-5xl'>Welcome To Laptop Bazar</h2>
            <p className='text-xl lg:text-3xl'>You can Buy and Sell your purchase Products</p>
            <button className='btn btn-outline'>Get Started</button>
        </div>
    );
};

export default Banner;