import React from 'react';
import moment from 'moment'
const ProductCard = ({ product }) => {
    const { image, brand, originalPrice, resellPrice, used, location, model, date } = product;
   
    return (
			<div className="card w-full h-[500px] bg-base-100 shadow-xl  text-center">
				<figure className="px-10 mt-5">
					<img src={image} alt="Shoes" className="rounded-lg" />
				</figure>
				<div className="card-body items-center">
					<h2 className="card-title">Brand: {brand}</h2>
					<p className="text-lg font-semibold"> Model: {model}</p>
					<p> Year of Used: {used} years</p>
					<div className="flex gap-4">
						<p> Original Price: ${originalPrice}</p>
						<p> Resale Price: ${resellPrice}</p>
					</div>
					<p>Location: {location}</p>
					<p>
						Post Time: {moment.utc(date).local().startOf("seconds").fromNow()}
					</p>
					<div className="card-actions">
						<button className="btn btn-primary">Book Now</button>
					</div>
				</div>
			</div>
		);
};

export default ProductCard;