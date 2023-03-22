import React from "react";
import AboutUs from "../AboutUs/AboutUs";
import Advertises from "../Advertise/Advertises";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
const Home = () => {
	return (
		<>
			<Banner />
			<div className="w-11/12 mx-auto">
				<Advertises />
				<Categories />
				<AboutUs />
				
</div>
		</>
	);
};

export default Home;
