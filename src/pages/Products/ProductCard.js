
import { MdVerified } from "react-icons/md";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useBuyer from "../../hooks/useBuyer";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Shared/Loading/Loading";
import './styles.css'
import PrimaryButton from "../Shared/PrimaryButton/PrimaryButton";
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
	const firstLetter = name.charAt(0).toUpperCase();
	const remainingLetter = name.slice(1);
	const capitalizeWord = firstLetter + remainingLetter;
	console.log(capitalizeWord);
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
		<div className="max-w-lg rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 transition-all duration-700 ease-in-out hover:scale-105">
			<div className="geeks">
				<img
					src={image}
					alt=""
					className="object-cover transition-all duration-700 ease-in-out object-center w-full rounded-t-md h-72 dark:bg-gray-500 "
				/>
			</div>
			<div
				className="flex flex-col justify-between px-6 
			 py-3 space-y-4">
				<div>
					<h2 className="text-2xl font-semibold tracking-wide">{model}</h2>
					<small>
						Posted on {moment(date).fromNow()}, {location}
					</small>
					<hr />
					<p className="font-semibold text-[navy] text-xl">${resellPrice}</p>
					<p>
						For sale by{" "}
						<span className="font-semibold">
							{capitalizeWord}
							{userData?.isVerified && (
								<span className="text-blue-900 ">
									<MdVerified className="inline" />
								</span>
							)}
						</span>
					</p>
					<div className="grid grid-cols-2 mt-3">
						<p>Condition:</p>
						<p>{condition}</p>
					</div>
					<div className="grid grid-cols-2 ">
						<p>Brand:</p>
						<p>{brand}</p>
					</div>
					<div className="grid grid-cols-2 ">
						<p>Model:</p>
						<p>{model}</p>
					</div>
					<div className="grid grid-cols-2 ">
						<p>Condition:</p>
						<p>{condition}</p>
					</div>
					<div className="grid grid-cols-2 ">
						<p>Purchase on:</p>
						<p>{purchase}</p>
					</div>
					<div className="grid grid-cols-2 ">
						<p>Original Price:</p>
						<p>{originalPrice}</p>
					</div>
					<div className="grid grid-cols-2 ">
						<p>Resale Price:</p>
						<p>{resellPrice}</p>
					</div>
					<div>
						<p className="font-semibold">Description:</p>
						<p>{description}</p>
					</div>
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
