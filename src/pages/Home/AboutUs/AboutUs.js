import React from "react";
import logo from "../../../Assets/phones-switch-apps-removebg-preview.png";

const AboutUs = () => {
	return (
		<div className="hero bg-base-200 py-10">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<img src={logo} alt="" className="max-w-sm rounded-lg shadow-2xl" />
				<div>
					<h1 className="text-center text-4xl mb-10">About Us</h1>
					<p className="text-xl text-justify">
						with our expetise in this domain, we Visionary Mobile at Malad west,
						Chittagong are engaged in buying and selling of second hand mobile
						phones. Apart from this, we also deal in new and latest mobile
						phones. we offer a quality used product backed up with exceptional
						customer service . All our handsets are processed through our
						strenuous quality control program to ensure that the product you
						receive is in full working order. Apart from this, we also deal in
						fresh and latest mobile phones
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
