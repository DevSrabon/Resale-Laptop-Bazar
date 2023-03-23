import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";
import "./Banner.css";
const Banner = () => {
	const{logOut}=useContext(AuthContext)
	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<section className="mb-5">
				<div className={`hero pt-5 md:pt-20 banner`}>
					<div className="hero-content flex-col lg:flex-row-reverse">
						<img
							src="https://i.ibb.co/HFrSS3c/banner.png"
							className="lg:max-w-xl rounded-lg "
							alt=""
						/>
						<div className="text-white">
							<h1 className="text-3xl md:text-5xl font-bold text-white">
								Shop the Best <br /> Resale <span className="text-lime-600">Deals Online!</span>
							</h1>
							<p className="py-6">
								Looking for a high-quality, pre-owned laptop at an affordable
								price?
								<br className="hidden md:inline lg:hidden" />
								You've come to the right place! At Laptop Resale Bazar, we offer
								a wide selection of laptops from top brands like Acer, Dell, HP.
								Whether you're a student on a budget, a professional looking for
								a reliable work computer, or just someone in need of a new
								laptop for personal use, we have the perfect option for you
							</p>
							<Link to={"/login"} onClick={handleLogOut}>
								{" "}
								<PrimaryButton>Login Now</PrimaryButton>
							</Link>
						</div>
					</div>
				</div>
				{/* <div className="container flex flex-col justify-center px-1  md:py-12 lg:py-24 lg:flex-row lg:justify-around">
					<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-[40rem] w-full lg:text-left">
						<h1 className="text-3xl text-white font-bold leading-none md:text-5xl">
							Welcome To Laptop Bazar
						</h1>
						<p className="mt-6 mb-4 text-lg text-justify text-white">
							Looking for a high-quality, pre-owned laptop at an affordable
							price?
							<br className="hidden md:inline lg:hidden" />
							You've come to the right place! At Laptop Resale Bazar, we offer a
							wide selection of laptops from top brands like Acer, Dell, HP.
						</p>
						<div className="flex flex-col space-y-2 sm:items-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
							<Link to={"/login"} onClick={handleLogOut}>
								{" "}
								<PrimaryButton>Login Now</PrimaryButton>
							</Link>
						</div>
					</div>
					<div className="hidden md:block">
						<img
							src="https://i.ibb.co/HFrSS3c/banner.png"
							alt=""
							className="max-w-xl "
						/>
					</div>
				</div> */}
			</section>
		</>
	);
};

export default Banner;
