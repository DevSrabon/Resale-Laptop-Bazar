import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../pages/Shared/Footer/Footer';
import Navbar from '../../pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
			<>
				<div className="w-11/12 mx-auto">
					<Navbar />
					<Outlet />
				</div>
				<Footer />
			</>
		);
};

export default Main;