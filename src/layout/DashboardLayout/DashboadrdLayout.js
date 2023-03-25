import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useBuyer from "../../hooks/useBuyer";
import useSeller from "../../hooks/useSeller";
import Navbar from "../../pages/Shared/Navbar/Navbar";
import {

	MdDelete,
	MdCategory,
	MdLibraryAdd,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsShopWindow } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { styles } from "../../styles";
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
				<div className="drawer-side -mt-5">
					<label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
					<ul className="menu p-2 w-60 bg-base-100 text-[green] text-md font-bold mt-5">
						<>
							{isBuyer && (
								<li className={styles.DashboardBtn}>
									<Link to="/dashboard">
										<AiOutlineShoppingCart className="text-xl -mr-2" /> My
										Booking
									</Link>
								</li>
							)}
						</>
						<>
							{isSeller && (
								<>
									{" "}
									<li className={styles.DashboardBtn}>
										<Link to="/dashboard/myproduct">
											<BsShopWindow className="text-xl -mr-2" /> My Product
										</Link>
									</li>
									<li className={styles.DashboardBtn}>
										<Link to="/dashboard/addproduct">
											<MdLibraryAdd className="text-xl -mr-2" />
											Add A Product
										</Link>
									</li>
								</>
							)}
						</>

						<>
							{isAdmin && (
								<>
									<li className={styles.DashboardBtn}>
										<Link to="/dashboard/allusers">
											<FaUsers className="text-xl -mr-2" /> All Users
										</Link>
									</li>
									<li className={styles.DashboardBtn}>
										<Link to="/dashboard/reports">
											<MdDelete className="text-xl -mr-2" /> Reported Items
										</Link>
									</li>
									<li className={styles.DashboardBtn}>
										<Link to="/dashboard/addCategories">
											<MdCategory className="text-xl -mr-2" />
											Add Categories
										</Link>
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
