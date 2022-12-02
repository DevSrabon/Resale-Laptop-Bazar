
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useBuyer from "../../../hooks/useBuyer";

const Dashboard = () => {

	const { user } = useContext(AuthContext);

	const [isBuyer] = useBuyer(user?.email);
  const [bookings, setBookings] = useState([])
    
  useEffect(()=>{
  if(user?.email){
      fetch(`${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			})
				.then((res) => res.json())
				.then((data) => setBookings(data));
  }
  }, [user?.email])

	return (
		<>
			{isBuyer && (
				<section>
					<h3 className="text-3xl mb-5">My Booking</h3>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
								<tr>
									<th>SL.</th>
									<th>Model</th>
									<th>Phone</th>
									<th>Price</th>
									<th>Location</th>
									<th>Payment</th>
								</tr>
							</thead>
							<tbody>
								{bookings &&
									bookings?.map((booking, i) => (
										<tr key={booking._id}>
											<th>{i + 1}</th>
											<td>{booking.model}</td>
											<td>{booking.phone}</td>
											<td>{booking.price}</td>
											<td>{booking.location}</td>
											<td>
												{booking?.price && !booking.paid && (
													<Link to={`/dashboard/payment/${booking._id}`}>
														<button className="btn btn-primary btn-sm">
															Pay
														</button>
													</Link>
												)}
												{booking.price && booking.paid && (
													<span className="text-accent">Paid</span>
												)}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</section>
			)}
		</>
	);
};

export default Dashboard;
