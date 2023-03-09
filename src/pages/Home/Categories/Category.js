import React from 'react';

const Category = ({ home }) => {
    const { brand, img } = home;
    return (
			<div className="card w-full h-64 p-3 bg-base-100 shadow-2xl transition-all duration-700 ease-in-out hover:scale-105">
				<figure>
					<img className="w-full h-60" src={img} alt={brand} />
				</figure>
			</div>
		);
};

export default Category;