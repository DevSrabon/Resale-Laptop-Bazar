import { useQuery } from "@tanstack/react-query";
// import React, { useContext } from "react";
import toast from "react-hot-toast";
// import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from '../../Shared/Loading/Loading'
import { getAuth, deleteUser } from "firebase/auth";

const auth = getAuth();

const removeUser = auth.currentUser;
const AllUsers = () => {
	const { data: users = [], refetch, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
			const data = await res.json();
			return data;
		},
    });
    console.log(users)
    const handleDeleteUser = (user) => {

			fetch(`${process.env.REACT_APP_API_URL}/users/${user._id}`, {
				method: "DELETE",
				headers: {
					authorization: `bearer ${localStorage.getItem("accessToken")}`,
				},
			})
				.then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        deleteUser(removeUser)
                                                    .then(() => {
                                                       toast.success('Deleted from firebase')
                                                    })
                                                    .catch((error) => {
                                                     
                                                    });
                        refetch();

						toast.success( 'User deleted successfully');
					}
				});
	};
	
	const handleMakeVerified = (id) => {
		console.log(id)
		fetch(`${process.env.REACT_APP_API_URL}/users/verified/${id}`, {
			method: "PUT",
			headers: {
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					toast.success("Make verified successful.");
					refetch();
				}
			});
	};
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
			<div className="my-5">
				<h2 className="text-3xl">Manage Users: {users?.length}</h2>
				<div className="overflow-x-auto mt-5">
					<table className="table w-full">
						<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Verified</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{users?.map((user, i) => (
								<tr key={user._id}>
									<th>{i + 1}</th>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>
										{user?.isVerified !== "verified" ? (
											<button
												onClick={() => handleMakeVerified(user._id)}
												className="btn btn-xs btn-primary">
												Make Verify
											</button>
										) : (
											<p>Verified</p>
										)}
									</td>
									<td>
										<button
											onClick={() => handleDeleteUser(user)}
											disabled={isLoading}
											className="btn btn-sm btn-danger text-white">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
};

export default AllUsers;
