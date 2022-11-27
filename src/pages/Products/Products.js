import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const Products = () => {
    const products = useLoaderData();
    console.log(products)
    return (
        <div>
            {products.length}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
            {
                products.map(product => <ProductCard key={product._id} product={product}/>)
            }
            </div>
        </div>
    );
};

export default Products;