import React, { useEffect } from "react";
import { styles } from "../../../styles";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
	useEffect(() => {
		AOS.init({ duration: 700, delay: 10 });
	}, []);
	return (
		<div className="hero my-10">
			<div className="hero-content p-0 flex-col gap-4 md:gap-12 lg:flex-row">
				<img
					data-aos="fade-up"
					src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
					alt=""
					className="md:max-w-sm rounded-lg shadow-2xl"
				/>
				<div data-aos="fade-up">
					<h1 className={`${styles.HomeHeadingText}`}>About Us</h1>
					<p className="text-xl text-gray-400 text-justify">
						Laptop Bazar is the best used laptop shop in Bangladesh and a
						leading seller of all kinds of IT products. It’s been a place of
						reliability for new and used laptops as well as other accessories
						since its beginning back in 2014. We, as a used laptop shop, supply
						A-grade used laptops imported from Dubai, Malaysia, and Singapore.
						With a goal of giving exceptional customer support, Laptop Bazar is
						also working with multiple corporate clients.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
