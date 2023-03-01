
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Shared/Loading/Loading';
import BookingModal from './BookingModal';
import ProductCard from './ProductCard';

const Products = () => {
	const { id } = useParams();

	const { data: products = [], refetch, isLoading } = useQuery({
		queryKey: ["product", id],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/product/${id}`);
			const data = await res.json();
			return data;
		},
	});
	const [modal, setModal]=useState('')
	if (isLoading) {
		return <Spinner/>
	}

    return (
			<div>
				<h4 className="text-3xl text-center font-bold text-slate-400 my-5">
					{/* {products?.[0].brand} Laptops */}
				</h4>

				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 mb-5">
					{products?.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							setModal={setModal}
							refetch={refetch}
							
						/>
					))}
				</div>
				{modal && (
					<BookingModal key={modal._id} setModal={setModal} modal={modal} />
				)}
			</div>
		);
};

export default Products;