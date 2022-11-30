import moment from 'moment/moment';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading/Loading'
const MyProductCard = ({ product, isLoading, refetch, handleAdvertise }) => {
	const {
		image,
		brand,
		originalPrice,
		resellPrice,
		purchase,
		location,
		model,
		date,
		description,
		_id,
	} = product;

	const handleDelete = (user) => {
		fetch(`${process.env.REACT_APP_API_URL}/product/${user}`, {
			method: "DELETE",
			headers: {
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount > 0) {
					toast.success("User deleted successfully");
					refetch();
				}
			});
		console.log(user);
	};

	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div className="card w-full h-[500px] y bg-base-100 shadow-xl">
			<figure className="px-10 mt-5">
				<img src={image} alt="Shoes" className="rounded-lg" />
			</figure>
			<div className="card-body items-start text-slate-500">
				<h2 className="card-title">Brand: {brand}</h2>
				<div className="font-medium">
					<p className="text-lg font-semibold"> Model: {model}</p>
					<p> Year of purchase: {purchase} years</p>
					<div className="flex gap-4">
						<p> Original Price: ${originalPrice}</p>
						<p> Resale Price: ${resellPrice}</p>
					</div>
					<p>Description : {description}</p>
					<p>Location: {location}</p>
					<p className="mt-2">
						{moment.utc(date).local().startOf("seconds").fromNow()}
					</p>
				</div>

				<div className="card-actions items-center gap-16">
											<button
							onClick={() => handleAdvertise(
							_id)} className="btn btn-primary btn-sm
							">Advertise Now</button>

						<button
							onClick={() => handleDelete(_id)}
							className="btn btn-primary btn-sm">
							Delete
						</button>
				</div>
			</div>
		</div>

	);
};

export default MyProductCard;