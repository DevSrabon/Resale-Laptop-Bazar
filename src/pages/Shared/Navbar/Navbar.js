import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useBuyer from '../../../hooks/useBuyer';
import useSeller from '../../../hooks/useSeller';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, logOut } = useContext(AuthContext);
const [isAdmin] = useAdmin(user?.email);
const [isSeller] = useSeller(user?.email);
const [isBuyer] = useBuyer(user?.email);
	const handleLogOut = () => {
		logOut()
			.then(() => {
		})
		.catch((err) => console.log(err));
	};
    const menuItems = (
			<>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/faq">FAQ</Link>
				</li>
				{user?.uid ? (
					<>
						<li>
							<Link to={`${isSeller ? "/dashboard/myproduct":''}${isAdmin ? "/dashboard/allusers":''}${isBuyer ? "/dashboard":''}`}>Dashboard</Link>
						</li>
						<li>
							<button onClick={handleLogOut}>Sign out</button>
						</li>
					</>
				) : (
					<li>
						<Link to="/login">Login</Link>
					</li>
				)}
			</>
		);
    return (
			<nav className="navbar bg-base-100 flex justify-between">
				<div className="navbar-start">
					<label
						htmlFor="dashboard-drawer"
						tabIndex={2}
						className="btn btn-ghost lg:hidden bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<Link
						to="/"
						className="btn btn-ghost normal-case text-[#2d2d9a] text-3xl font-bold">
						Laptop Bazar
					</Link>
				</div>
				<div className="navbar-end hidden  font-bold lg:flex">
					<ul className="menu menu-horizontal p-0 text-[#2d2d9a]">
						{menuItems}
					</ul>
				</div>
				<div className="dropdown relative">
					<label
						onClick={() => setIsOpen(!isOpen)}
						tabIndex={0}
						className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					{isOpen && (
						<ul
							onClick={() => setIsOpen(!isOpen)}
							tabIndex={1}
							className="menu menu-compact dropdown-content shadow bg-base-100 rounded-lg w-52 absolute right-0 top-14">
							{menuItems}
						</ul>
					)}
				</div>
			</nav>
		);
};

export default Navbar;