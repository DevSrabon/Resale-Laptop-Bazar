import { MdVerified } from "react-icons/md";
import moment, { duration } from "moment";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AOS from "aos"
import 'aos/dist/aos.css'
import { useQuery } from "@tanstack/react-query";
import "../../Products/styles.css";
import { AuthContext } from "../../../contexts/AuthProvider";
import useBuyer from "../../../hooks/useBuyer";
import Spinner from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import { styles } from "../../../styles";

const Advertise = ({ advertise, setModal, refetch }) => {
	const { user, logOut } = useContext(AuthContext);
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
	} = advertise;
	const firstLetter = name.charAt(0).toUpperCase();
	const remainingLetter = name.slice(1);
	const capitalizeWord = firstLetter + remainingLetter;
	const [isBuyer] = useBuyer(user?.email);
	const [userData, setUserData] = useState({});
	const { data: loadUserData = [], isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
			const data = await res.json();
			return data;
		},
	});

	useEffect(() => {
		const data = loadUserData.find((e) => e.email === email);
		setUserData(data);
	}, [email, loadUserData]);
	useEffect(() => {
	AOS.init({ duration: 1000, delay: 100 });
},[])
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
					refetch();
					toast.success("Reported successful.");
				}
			});
	};
	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((err) => console.log(err));
	};
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div
			className="max-w-lg rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 transition-all duration-700 ease-in-out hover:scale-105 h-[800px] relative"
			data-aos="fade-up"
			>
			<div className="geeks">
				<img
					src={image}
					alt=""
					className="object-cover transition-all duration-700 ease-in-out object-center w-full rounded-t-md h-72 dark:bg-gray-500 "
				/>
			</div>
			<div
				className="flex flex-col justify-around px-6 
			 py-3 space-y-4">
				<div>
					<h2 className="text-2xl font-semibold tracking-wide">{model}</h2>
					<small>
						Posted on {moment(date).fromNow()}, {location}
					</small>
					<hr />
					<div className="flex justify-between items-center">
						<div>
							<p className="font-semibold text-[green] text-xl">
								${resellPrice} <del className="text-sm">(${ originalPrice})</del>
							</p>

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
						</div>
						<div>
							{isBuyer && !report && (
								<button
									className={styles.SmallBtnColor}
									onClick={() => handleReport(_id)}>
									Report To Admin
								</button>
							)}
						</div>
					</div>
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
						<p>${originalPrice}</p>
					</div>
					<div className="grid grid-cols-2 ">
						<p>Resale Price:</p>
						<p>${resellPrice}</p>
					</div>
					<div>
						<p className="font-semibold">Description:</p>
						<p>{description}</p>
					</div>
				</div>
				<div className="flex text-center items-center w-11/12 absolute bottom-0  footer">
					{user?.email ? (
						<>
							{isBuyer ? (
								<label
									onClick={() => setModal(advertise)}
									className={`${styles.BtnColor}`}
									htmlFor="booking-modal">
									Book Now
								</label>
							) : (
								<Link
									onClick={handleLogOut}
									className={`${styles.BtnColor}`}
									to={"/login"}>
									Please Login As A Buyer
								</Link>
							)}
						</>
					) : (
						<>
							<Link className={`${styles.BtnColor}`} to={"/login"}>
								Please Login
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Advertise;
