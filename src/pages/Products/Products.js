import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { styles } from "../../styles";
import Spinner from "../Shared/Loading/Loading";
import ProductCard from "./ProductCard";

const Products = () => {
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { id } = useParams();
	const {
		data: products = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["product", id],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/product/${id}`);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			{products.length ? (
				<div className="mb-10 px-2">
					<h4 className={`${styles.SectionHeadText}`}>{products[0].brand}</h4>

					<div
						className={`${
							products.length < 3
								? "flex flex-col md:flex-row gap-10 items-center  justify-center "
								: "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-10 md:mb-10"
						} `}>
						{products.length > 0 &&
							products?.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									refetch={refetch}
								/>
							))}
					</div>
				</div>
			) : (
				<h3 className="text-center h-[100vh] flex items-center justify-center text-2xl font-bold">
					No Product Found.
				</h3>
			)}
		</>
	);
};

export default Products;
