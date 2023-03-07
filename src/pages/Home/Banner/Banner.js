import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";
import "./Banner.css";
const Banner = () => {
	return (
		<>
			<section className="dark:bg-gray-800 dark:text-gray-100">
				<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
					<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
						<h1 className="text-5xl text-[navy] font-bold leading-none sm:text-6xl">
							Welcome To Laptop Bazar
						</h1>
						<p className="mt-6 mb-4 text-lg sm:mb-6">
							Looking for a high-quality, pre-owned laptop at an affordable
							price?
							<br className="hidden md:inline lg:hidden" />
							You've come to the right place! At Laptop Resale Bazar, we offer a
							wide selection of laptops from top brands like Acer, Dell, HP.
						</p>
						<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
							<Link
								to={"/login"}>
								{" "}
								<PrimaryButton>
									Get Started
								</PrimaryButton>
							</Link>
						</div>
					</div>
					<div className="hidden md:flex items-center justify-center p-6   md:mt-18 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
						<Player
							autoplay
							loop
							className="w-[80%]"
							src={
								"https://assets2.lottiefiles.com/packages/lf20_g1YJeb.json"
							}></Player>
					</div>
				</div>
			</section>
		</>
	);
};

export default Banner;
