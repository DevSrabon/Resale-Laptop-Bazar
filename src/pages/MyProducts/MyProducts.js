import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import MyProductCard from './MyProductCard';

const MyProducts = () => {
        const { user } = useContext(AuthContext);

				const url = `${process.env.REACT_APP_API_URL}/product?email=${user?.email}`;
				const { data: products = [], isLoading, refetch } = useQuery({
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
			<div>
				<h4 className="text-3xl text-center font-bold text-slate-400 my-5">
					My Products
				</h4>

				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
					{products.map((product) => (
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
		);
};

export default MyProducts;