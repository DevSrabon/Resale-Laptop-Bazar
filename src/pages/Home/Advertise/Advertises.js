import React, { useEffect, useState } from "react";
import Loading from '../../Shared/Loading/Loading'
import Advertise from "./Advertise";

const Advertises = () => {
	const [advertises, setAdvertises] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products?advertise=true`)
			.then((res) => res.json())
			.then((data) => {
				setAdvertises(data);
				setLoading(false)
			});
	}, []);

	if (loading) {
		return <Loading/>
	}
	return (
		<div className="my-10">
			<h1 className="text-4xl font-bold text-center text-[navy] my-8">
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
