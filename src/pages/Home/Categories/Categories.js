import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import Loading from '../../Shared/Loading/Loading'
import { styles } from '../../../styles';
import AOS from "aos";
import "aos/dist/aos.css";
const Categories = () => {
    const { data: homes =[], isLoading } = useQuery({
			queryKey: ["homes"],
			queryFn: async () => {
				const res = fetch(`${process.env.REACT_APP_API_URL}/homes`);
				const data = (await res).json();
				return data;
			},
    });
useEffect(() => {
	AOS.init({ duration: 1000, delay: 100 });
}, []);
	if (isLoading) {
		return <Loading></Loading>
	}
    
	return (	
			<div data-aos="fade-up">
				<h1 className={`${styles.HomeHeadingText}`}>All Category</h1>
				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5 mb-5">
					{homes?.map((home) => (
						<Link key={home._id} to={`product/${home.brand}`}>
							<Category key={home._id} home={home} />
						</Link>
					))}
				</div>
			</div>

		);
};

export default Categories;