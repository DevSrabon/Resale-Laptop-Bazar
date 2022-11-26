import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ home }) => {
    const { name, img } = home;
    return (
			<div className="card w-full p-5 bg-base-100 shadow-xl">
				<figure>
					<img className='w-full h-60' src={img} alt="Shoes" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						{name}
                </h2>
                
				</div>
			</div>
		);
};

export default Category;