import React from 'react';

const Category = ({ home }) => {
    const { brand, img } = home;
    return (
			<div className="card w-full h-64 p-3 bg-base-100 shadow-2xl">
				<figure>
					<img className='w-full h-full' src={img} alt={brand} />
				</figure>
			</div>
		);
};

export default Category;