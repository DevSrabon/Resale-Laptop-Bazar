import moment from "moment/moment";
import React from "react";

const Advertise = ({ advertise }) => {
	const {
		image,
		brand,
		originalPrice,
		resellPrice,
		purchase,
		location,
		name,
		model,
		date,
		description,
	} = advertise;
	console.log(advertise);
	return (
		<div className="card w-96 bg-base-100 shadow-xl image-full">
			<figure>
				<img src={image} alt="Shoes" className="rounded-lg w-full" />
			</figure>
			<div className="card-body gap-10 items-start text-slate-500">
				<h2 className="card-title">Brand: {brand}</h2>
				<div className="font-medium flex flex-col gap-3">
					<p className="text-lg font-semibold"> Model: {model}</p>
					<p> Year of purchase: {purchase} years</p>
					<div className="flex gap-4">
						<p> Original Price: ${originalPrice}</p>
						<p> Resale Price: ${resellPrice}</p>
					</div>
					<p>Description : {description}</p>
					<p>Location: {location}</p>
					<p>{moment.utc(date).local().startOf("seconds").fromNow()}</p>
					<p>Seller : {name}</p>
				</div>
			</div>
		</div>
	);
};

export default Advertise;
