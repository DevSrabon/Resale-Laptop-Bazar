import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import { styles } from "../../styles";
import MyProductCard from "./MyProductCard";

const MyProducts = () => {
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { user } = useContext(AuthContext);
	const url = `${process.env.REACT_APP_API_URL}/product?email=${user?.email}`;
	const {
		data: products = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["products", user?.email],
		queryFn: async () => {
			const res = await fetch(url, {
				headers: {
					authorization: `bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			const data = await res.json();
			return data;
		},
	});
	const handleAdvertise = (_id) => {
		fetch(`${process.env.REACT_APP_API_URL}/advertise/${_id}`, {
			method: "PUT",
			headers: {
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged > 0) {
					toast.success("advertise added Successfully");
					refetch();
				}
			});
	};
	return (
		<>
			{products.length ? (
				<div>
					<h4 className={`${styles.SectionHeadText}`}>My Products</h4>

					<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
						{products?.map((product) => (
							<MyProductCard
								key={product._id}
								isLoading={isLoading}
								refetch={refetch}
								handleAdvertise={handleAdvertise}
								product={product}
							/>
						))}
					</div>
				</div>
			) : (
				<h3 className="text-center h-[100vh] flex items-center justify-center text-2xl font-bold">
					You have no product. Please add a Product.
				</h3>
			)}
		</>
	);
};

export default MyProducts;
