import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);

	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((err) => console.log(err));
	};
	const [isOpen, setIsOpen] = useState(false);
    const menuItems = (
			<React.Fragment>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/faq">FAQ</Link>
				</li>
				{user?.uid ? (
					<>
						<li>
							<Link to="/myproduct">My Product</Link>
						</li>
						<li>
							<Link to="/dashboard">Dashboard</Link>
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
			</React.Fragment>
		);
    return (
			<nav className="navbar bg-base-100 flex justify-between">
				<div className="navbar-start">
					<div className="dropdown">
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
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
								{menuItems}
							</ul>
						)}
					</div>
					<Link
						to="/"
						className="btn btn-ghost normal-case text-slate-400 text-3xl">
						Laptop Bazar
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal p-0">{menuItems}</ul>
				</div>
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
			</nav>
		);
};

export default Navbar;