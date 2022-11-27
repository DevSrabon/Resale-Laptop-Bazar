import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
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
    return (
			<div>
				<h4 className="text-3xl text-center font-bold text-slate-400 my-5">
					My Products
				</h4>

				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 mb-5">
					{products.map((product) => (
                        <MyProductCard key={product._id} isLoading={isLoading} refetch={refetch}  product={product}/>
					))}
				</div>
			</div>
		);
};

export default MyProducts;