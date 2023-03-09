import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styles } from "../../../styles";
import BookingModal from "../../Products/BookingModal";
import Loading from "../../Shared/Loading/Loading";
import Advertise from "./Advertise";

const Advertises = () => {
	 const { data: advertises = [], refetch , isLoading} = useQuery({
			queryKey: ["products", "advertise"],
			queryFn: async () => {
				const res = fetch(`${process.env.REACT_APP_API_URL}/products?advertise=true`);
				const data = (await res).json();
				return data;
			},
		});
const [modal, setModal] = useState("");
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className="my-10">
			<h1 className={`${styles.HomeHeadingText}`}>
				Best {advertises.length} Laptop
			</h1>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-5">
				{advertises?.map((advertise) => (
					<Advertise
						key={advertise._id}
						setModal={setModal}
						advertise={advertise} refetch={refetch}></Advertise>
				))}
			</div>
			{modal && (
				<BookingModal key={modal._id} setModal={setModal} modal={modal} />
			)}
		</div>
	);
};

export default Advertises;
