import { MdVerified } from "react-icons/md";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../../Products/styles.css";
import Spinner from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

const Advertise = ({ advertise, refetch }) => {
	const {
		_id,
		name,
		email,
		image,
		originalPrice,
		resellPrice,
		location,
		model,
		date,
	} = advertise;
	const firstLetter = name.charAt(0).toUpperCase();
	const remainingLetter = name.slice(1);
	const capitalizeWord = firstLetter + remainingLetter;
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
		window.scrollTo(0, 0);
		AOS.init({ duration: 700, delay: 10 });
		const data = loadUserData.find((e) => e.email === email);
		setUserData(data);
	}, [email, loadUserData]);
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section data-aos="fade-up">
			<div className="max-w-lg rounded-sm shadow-sm dark:bg-gray-900 dark:text-gray-100 transition-all duration-700 ease-in-out hover:shadow-lg hover:scale-105 relative group">
				<div className="geeks">
					<img
						src={image}
						alt=""
						className="object-cover transition-all duration-700 ease-in-out object-center w-full rounded-t-md h-64 dark:bg-gray-500 "
					/>
				</div>
				<div
					className="flex flex-col justify-around px-6 
			 py-3 space-y-4">
					<div>
						<h2 className="text-2xl font-semibold tracking-wide">{model}</h2>
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
										{capitalizeWord}
										{userData?.isVerified && (
											<span className="text-blue-900 ">
												<MdVerified className="inline" />
											</span>
										)}
									</span>
								</p>
							</div>
						</div>
						<div className="flex flex-row justify-between font-semibold py-2">
							<Link to={_id}>Learn More</Link>
							<Link to={_id} className="hidden group-hover:block ">
								<BsArrowRightCircle className="text-2xl" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Advertise;
