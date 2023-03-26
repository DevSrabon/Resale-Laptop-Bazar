import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { Link,  useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useBuyer from "../../../hooks/useBuyer";
import { styles } from "../../../styles";
import BookingModal from "../../Products/BookingModal";
import Spinner from "../../Shared/Loading/Loading";

const Detail = () => {
	const { id } = useParams();
	const { user, logOut } = useContext(AuthContext);
	const [modal, setModal] = useState("");
	const [advertise, setAdvertise] = useState({});
	const [isBuyer] = useBuyer(user?.email);
    const [userData, setUserData] = useState({});

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
	const {
		data = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["products", "advertise"],
		queryFn: async () => {
			const res = fetch(`${process.env.REACT_APP_API_URL}/product`);
			const data = (await res).json();
			return data;
		},
	});

	const { data: loadUserData = [] } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
			const data = await res.json();
			return data;
		},
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		const data = loadUserData.find((e) => e.email === email);
		setUserData(data);
	}, [email, loadUserData]);
	useEffect(() => {
		const advertises = data.find((item) => item._id === id);
		if (advertises) {
			setAdvertise(advertises);
		}
	}, [data, id]);
	if (isLoading) {
		return <Spinner />;
	}
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
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row">
				<img
					src={image}
					className="md:max-w-2xl rounded-lg shadow-2xl"
					alt=""
				/>
				<div
					className="flex flex-col justify-around px-6 
			 py-3 space-y-4">
					<div>
						<h2 className="text-2xl font-bold tracking-wide">{model}</h2>
						<small className="font-semibold">
							Posted on {moment(date).fromNow()}, {location}
						</small>
						<hr />
						<div className="flex justify-between items-center">
							<div>
								<p className="font-semibold text-[green] text-xl">
									${resellPrice}{" "}
									<del className="text-sm">(${originalPrice})</del>
								</p>

								<p>
									For sale by{" "}
									<span className="font-semibold">
										{name}
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
					<div className="flex text-center items-center w-11/12   footer">
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
					{modal && <BookingModal setModal={setModal} modal={modal} />}
				</div>
			</div>
		</div>
	);
};

export default Detail;
