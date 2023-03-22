import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";
import "./Banner.css";
const Banner = () => {
	return (
		<>
			<section className=" banner">
				<div className="container flex flex-col justify-center px-1  md:py-12 lg:py-24 lg:flex-row lg:justify-around">
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
							<Link to={"/login"}>
								{" "}
								<PrimaryButton>Get Started</PrimaryButton>
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
				</div>
			</section>
		</>
	);
};

export default Banner;
