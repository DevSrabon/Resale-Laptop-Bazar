import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Advertise from "./Advertise";

const Advertises = () => {
	const [advertises, setAdvertises] = useState([]);
	useEffect(() => {
		fetch(`http://localhost:8000/products?advertise=true`)
			.then((res) => res.json())
			.then((data) => {
				setAdvertises(data);
			});
	}, []);

	return (
		<div className="my-10">
			<h1 className="text-4xl font-bold text-center text-slate-500 my-8">
				Best {advertises.length} Laptop
			</h1>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-5">
				{advertises.map((advertise) => (
					<Advertise key={advertise._id} advertise={advertise}></Advertise>
				))}
			</div>
		</div>
	);
};

export default Advertises;
