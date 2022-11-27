import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
// import useAdmin from "../../hooks/useAdmin";
import Navbar from "../../pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
	const { user } = useContext(AuthContext);
	// const [isAdmin] = useAdmin(user?.email);
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
					<ul className="menu p-4 w-80 text-base-content">
						<li>
							<Link to="/dashboard">My Booking</Link>
						</li>
						{user?.uid && (
							<>
								<li>
									<Link to="/dashboard/allusers">All Users</Link>
								</li>
								<li>
									<Link to="/dashboard/addproduct">Add A Product</Link>
								</li>
								<li>
									<Link to="/dashboard/manageproduct">Add Manage Products</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
