import React from "react";
import AboutUs from "../AboutUs/AboutUs";
import Advertises from "../Advertise/Advertises";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
const Home = () => {
	return (
		<>
			<Banner />

				<Advertises />
				<Categories />
				<AboutUs />
		</>
	);
};

export default Home;
