
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal';
import ProductCard from './ProductCard';

const Products = () => {
	const products = useLoaderData();
	console.log(products);
    const [modal, setModal]=useState('')
    return (
			<div>
				<h4 className="text-3xl text-center font-bold text-slate-400 my-5">
					{products?.[0].brand} Laptops
				</h4>

				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 mb-5">
				{products.map((product) => (
						< ProductCard
							key = { product._id }
							product = { product }
							setModal = { setModal }
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