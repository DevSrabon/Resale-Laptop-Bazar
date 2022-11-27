import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';

const Categories = () => {
    const { data: homes =[] } = useQuery({
			queryKey: ["homes"],
			queryFn: async () => {
				const res = fetch(`${process.env.REACT_APP_API_URL}/homes`);
				const data = (await res).json();
				return data;
			},
    });

    
    return (
			<div>
				<h1 className="text-4xl">Category</h1>
				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
					{homes.map((home) => (
						<Link key={home._id} to={`product/${home.brand}`}>
							<Category key={home._id} home={home} />
						</Link>
					))}
				</div>
			</div>
		);
};

export default Categories;