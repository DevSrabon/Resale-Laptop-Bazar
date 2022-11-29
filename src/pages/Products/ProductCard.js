
import { MdOutlineVerifiedUser } from "react-icons/md";
import moment from "moment";
import { useEffect, useState } from "react";
const ProductCard = ({ product, setModal,  }) => {
	const {
		name,
		description,
		email,
		image,
		brand,
		originalPrice,
		resellPrice,
		purchase,
		location,
		model,
		date,
	} = product;

	console.log(name);


		const [loadUserData, setLoadUserData] = useState([]);
		const [userData, setUserData] = useState({});
		useEffect(() => {
			// axios.get(`${process.env.REACT_APP_API_URL}/users`)
			// 	.then((data) => setLoadUserData(data));
			fetch(`${process.env.REACT_APP_API_URL}/users`)
				.then(res => res.json())
			.then(data => setLoadUserData(data))
		}, []);
	
	useEffect(() => {
		const data = (loadUserData.find(e => e.email === email) )
		setUserData(data);
	}, [email, loadUserData])

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
				<p className="flex items-center gap-1 font-bold">
					{name}
					{userData?.isVerified && (
						<span className="text-blue-600 ">
							<MdOutlineVerifiedUser />
						</span>
					)}
				</p>

				<div className="card-actions">
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
