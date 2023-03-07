import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { styles } from "../../../styles";
import Loading from "../../Shared/Loading/Loading";

const ReportedItems = () => {
	const [reportUser, setReportUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refetch, setRefetch] = useState(true);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/reports?report=reported`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setReportUser(data);
			});
	}, [refetch]);

	const handleDeleteUser = (user) => {
		fetch(`${process.env.REACT_APP_API_URL}/product/${user._id}`, {
			method: "DELETE",
			headers: {
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(true);
				if (data.deletedCount > 0) {
					setRefetch(!refetch);
					setLoading(false);
					toast.success("User deleted successfully");
				}
			});
	};
	if (loading) {
		return <Loading />;
	}
	return (
		<div className="my-5">
			<h2 className={`${styles.SectionHeadText}`}>
				Manage reports: {reportUser?.length}
			</h2>
			<div className="overflow-x-auto mt-5">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Item Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{reportUser?.map((user, i) => (
							<tr key={user._id}>
								<th>{i + 1}</th>
								<td>{user?.name}</td>
								<td>{user?.email}</td>
								<td>{user?.model}</td>

								<td>
									{user?.report && (
										<button
											onClick={() => handleDeleteUser(user)}
											className="btn btn-sm btn-danger text-white">
											Delete
										</button>
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

export default ReportedItems;
