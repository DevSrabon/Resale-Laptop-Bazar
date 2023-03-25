import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useBookData } from "../../../contexts/BookProvider.js";
import useBuyer from "../../../hooks/useBuyer";
import { styles } from "../../../styles";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [isBuyer] = useBuyer(user?.email);
	const { bookings, setRefetch } = useBookData();
	console.log("🚀 ~ file: Dashboard.js:12 ~ Dashboard ~ bookings:", bookings);
	const handleDelete = (id) => {
		if (window.confirm("Are You Want To Delete") === true) {
			fetch(`${process.env.REACT_APP_API_URL}/book/${id}`, {
				method: "DELETE",
				headers: {
					authorization: `bearer ${localStorage.getItem("accessToken")}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.acknowledged) {
						setRefetch((prev) => !prev);
						toast.success("Deleted");
					}
				});
		}
	};
	useEffect(() => {
		window.scrollTo(0,0)
	},[])
	return (
		<>
			{isBuyer && (
				<>
					{bookings.length ? (
						<>
							<section>
								<h3 className={`${styles.SectionHeadText}`}>My Booking</h3>
								<div className="overflow-x-auto">
									<table className="table w-full">
										<thead>
											<tr>
												<th>SL.</th>
												<th>Model</th>
												<th>Item Image</th>
												<th>Phone</th>
												<th>Price</th>
												<th>Location</th>
												<th>Payment</th>
												<th>Delete</th>
											</tr>
										</thead>
										<tbody>
											{bookings?.map((booking, i) => (
												<tr key={booking._id}>
													<th>{i + 1}</th>
													<td>{booking.model}</td>
													<td>
														<img src={booking?.image} className="w-16" alt="" />
													</td>
													<td>{booking.phone}</td>
													<td>${booking.price}</td>
													<td>{booking.location}</td>
													<td>
														{booking?.price && !booking.paid && (
															<Link to={`/dashboard/payment/${booking._id}`}>
																<button className={styles.SmallBtnColor}>
																	Pay
																</button>
															</Link>
														)}
														{booking.price && booking.paid && (
															<span className="text-accent">Paid</span>
														)}
													</td>
													<td>
														{!booking.paid && (
															<AiFillDelete
																onClick={() => handleDelete(booking._id)}
																className="text-[green] text-2xl cursor-pointer bg-slate-200 p-1 w-8 h-8 rounded-full"
															/>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</section>
						</>
					) : (
						<h3 className="text-center h-[100vh] flex items-center justify-center text-2xl font-bold">
							You have no booked product
						</h3>
					)}
				</>
			)}
		</>
	);
};

export default Dashboard;
