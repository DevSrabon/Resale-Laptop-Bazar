import React, { useContext, useState } from "react";
import moment from "moment";
// import { AuthContext } from "../../contexts/AuthProvider";
// import toast from "react-hot-toast";
const ProductCard = ({ product, setModal }) => {
	const {
		image,
		brand,
		originalPrice,
		resellPrice,
		used,
		location,
		model,
		date,
	} = product;
// const [disabled, setDisabled] = useState(false)

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
					{/* <button className="btn btn-primary">Book Now</button> */}
					{/* {
						disabled ? <div>Booked</div>:
					} */}
					<label
						onClick={() => setModal(product)}
						className="btn btn-primary"
						htmlFor="booking-modal">
						Book Now
					</label>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
