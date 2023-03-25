import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
const Category = ({ home }) => {
	const { brand, img } = home;
	useEffect(() => {
		AOS.init({ duration: 1000, delay: 100 });
	}, []);
    return (
			<div data-aos="fade-up" className="card w-full h-64 p-3 bg-base-100 shadow-2xl transition-all duration-700 ease-in-out hover:scale-105">
				<figure>
					<img className="w-full h-60" src={img} alt={brand} />
				</figure>
			</div>
		);
};

export default Category;