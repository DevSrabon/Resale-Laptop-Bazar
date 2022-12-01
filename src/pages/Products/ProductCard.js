
import { MdOutlineVerifiedUser } from "react-icons/md";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useBuyer from "../../hooks/useBuyer";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
const ProductCard = ({ product, setModal,  }) => {
	const { user } = useContext(AuthContext);
	const {
		_id,
		name,
		description,
		email,
		image,
		brand,
		report,
		originalPrice,
		resellPrice,
		purchase,
		location,
		model,
		date,
	} = product;

	const [isBuyer] = useBuyer(user?.email)

		const [loadUserData, setLoadUserData] = useState([]);
	const [userData, setUserData] = useState({});
	const [refetch, setRefetch] = useState(true)
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/users`)
			.then(res => setLoadUserData(res.data));
			// fetch(`${process.env.REACT_APP_API_URL}/users`)
			// 	.then(res => res.json())
			// .then(data => setLoadUserData(data))
		}, [refetch]);
	
	useEffect(() => {
		const data = (loadUserData.find(e => e.email === email) )
		setUserData(data);
	}, [email, loadUserData])

	const handleReport = (id) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/report/${id}`, {
			method: "PUT",
			headers: {
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data.matchedCount > 0) {
					setRefetch(!report);
					toast.success("Reported successful.");
				}
			});
	};

	return (
		<div className="card w-full h-[500px] y bg-base-100 shadow-xl">
			<figure className="px-10 mt-5">
				<img src={image} alt="Shoes" className="rounded-lg" />
			</figure>
			<div className="card-body items-start text-slate-500">
				<h2 className="card-title">Brand: {brand}</h2>
				<div className="font-medium">
					<p className="flex items-center gap-1 mb-3 font-bold">
						{name}
						{userData?.isVerified && (
							<span className="text-blue-900 ">
								<MdOutlineVerifiedUser />
							</span>
						)}
					</p>
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
					{ isBuyer &&
						<label
							onClick={() => setModal(product)}
							className="btn btn-primary"
							htmlFor="booking-modal">
							Book Now
						</label>
					}
					{isBuyer && !report && (
						<button
							className="btn btn-primary"
							onClick={() => handleReport(_id)}>
							Report
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
