import React from 'react';
import './Banner.css'
const Banner = () => {
    return (
			<div
				className="hero min-h-[80vh] rounded-lg mb-12"
				style={{
                    backgroundImage: `url("https://img.freepik.com/free-photo/female-hand-typing-keyboard-laptop_1150-15742.jpg?w=996&t=st=1669964862~exp=1669965462~hmac=ab0beed9162b446d309ee39b0411719c5f0df5905e5a9ebf8f2645c524b0b650")`,
                   
				}}>
				<div className="hero-overlay bg-opacity-60 rounded-lg"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-4xl font-bold">Welcome To Laptop Bazar</h1>
						<p className="mb-5">You can Buy and Sell your purchase Products</p>
						<button className="btn  btn-outline">Get Started</button>
					</div>
				</div>
			</div>
		);
};

export default Banner;