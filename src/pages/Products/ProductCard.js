
import { MdOutlineVerifiedUser } from "react-icons/md";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useBuyer from "../../hooks/useBuyer";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Shared/Loading/Loading";
const ProductCard = ({ product, setModal, refetch }) => {
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
		condition,
		purchase,
		location,
		model,
		date,
	} = product;

	const [isBuyer] = useBuyer(user?.email)

	const [userData, setUserData] = useState({});
const {
	data: loadUserData = [],
	isLoading,
} = useQuery({
	queryKey: ["users"],
	queryFn: async () => {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
		const data = await res.json();
		return data;
	},
});
	
	useEffect(() => {
		const data = (loadUserData.find(e => e.email === email) )
		setUserData(data);
	}, [email, loadUserData]);

	const handleReport = (id) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/report/${id}`, {
			method: "PUT",
			headers: {
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					refetch()
					toast.success("Reported successful.");
				}
			});
	};
	if (isLoading) {
		return <Spinner/>
	}

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
					<p>Condition : {condition}</p>
					<p>Location: {location}</p>
					<p className="mt-2">
						{moment.utc(date).local().startOf("seconds").fromNow()}
					</p>
				</div>

				<div className="flex justify-between items-center w-full">
					{isBuyer && (
						<label
							onClick={() => setModal(product)}
							className="bg-[navy] text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-2xl hover:bg-[#010144] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
							htmlFor="booking-modal">
							Book Now
						</label>
					)}
					{isBuyer && !report && (
						<button
							className="bg-[navy] text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-2xl hover:bg-[#010144] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
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
