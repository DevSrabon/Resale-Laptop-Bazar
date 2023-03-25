import React from "react";
import AboutUs from "../AboutUs/AboutUs";
import Advertises from "../Advertise/Advertises";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { Team } from "../Team/Team";
const Home = () => {
	return (
		<>
			<Banner />
			<div className="w-11/12 mx-auto">
				<Advertises />
				<Categories />
				<Team/>
				<AboutUs />
				
</div>
		</>
	);
};

export default Home;
