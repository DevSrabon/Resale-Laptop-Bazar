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
				<div className={`hero pt-5 md:py-16 banner`}>
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
			</section>
		</>
	);
};

export default Banner;
