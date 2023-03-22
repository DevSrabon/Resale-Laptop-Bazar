import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useBuyer from "../../hooks/useBuyer";
import useSeller from "../../hooks/useSeller";
import Navbar from "../../pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
	const { user } = useContext(AuthContext);
	const [isAdmin] = useAdmin(user?.email);
	const [isSeller] = useSeller(user?.email);
	const [isBuyer] = useBuyer(user?.email);

	return (
		<div>
			<Navbar></Navbar>
			<div className="drawer drawer-mobile gap-3">
				<input
					id="dashboard-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					<Outlet></Outlet>
				</div>
				<div className="drawer-side">
					<label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
					<ul className="menu p-2 w-60 bg-base-100 text-[green] text-md font-bold mt-5">
						<>
							{isBuyer && (
								<li>
									<Link to="/dashboard">My Booking</Link>
								</li>
							)}
						</>
						<>
							{isSeller && (
								<>
									{" "}
									<li>
										<Link to="/dashboard/myproduct">My Product</Link>
									</li>
									<li>
										<Link to="/dashboard/addproduct">Add A Product</Link>
									</li>
								</>
							)}
						</>

						<>
							{isAdmin && (
								<>
									<li>
										<Link to="/dashboard/allusers">All Users</Link>
									</li>
									<li>
										<Link to="/dashboard/reports">Reported Items</Link>
									</li>
									<li>
										<Link to="/dashboard/addCategories">Add Categories</Link>
									</li>
								</>
							)}
						</>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
