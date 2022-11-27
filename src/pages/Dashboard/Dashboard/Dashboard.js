import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Dashboard = () => {
	const { user } = useContext(AuthContext);

	const url = `${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`;
	const { data: bookings = [] } = useQuery({
		queryKey: ["bookings", user?.email],
		queryFn: async () => {
			const res = await fetch(url, {
				headers: {
					authorization: `bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			const data = await res.json();
			return data;
        },
	});
    console.log(bookings);
	return (
		<div>
			<h3 className="text-3xl mb-5">My Booking</h3>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th>SL.</th>
							<th>Name</th>
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
												<button className="btn btn-primary btn-sm">Pay</button>
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
		</div>
	);
};

export default Dashboard;
