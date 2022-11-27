import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";
const SignUp = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [createdUserEmail, setCreatedUserEmail] = useState("");
	const [token] = useToken(createdUserEmail);
	const navigate = useNavigate();

	if (token) {
		navigate("/");
	}

	const { createUser, updateUser, } = useContext(AuthContext);
	const [signUError, setSignUpError] = useState(true);
	const handleSignUp = (data) => {
		console.log(data);
		setSignUpError("");
		createUser(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				toast("User Created Successfully");
				const userInfo = {
					displayName: data.name,
				};
				updateUser(userInfo)
					.then(() => {
                        savedUser(data.name, data.email, data.role);
                    navigate('/')
					})
					.catch((err) => console.error(err));
			})
			.catch((err) => {
				setSignUpError(err.message);
			});
	};

	
	const savedUser = (name, email, role) => {
		const user = { name, email, role };
		fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				setCreatedUserEmail(email);
			});
	};

	return (
		<div className="h-[800px] flex justify-center items-center ">
			<div className="w-96 p-7 shadow-2xl">
				<h2 className="text-xl text-center">Signup</h2>
				<form onSubmit={handleSubmit(handleSignUp)}>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="text"
							{...register("name", {
								required: "Name Address is required",
							})}
						/>
						{errors.name && (
							<p className="text-red-600">{errors.name?.message}</p>
						)}
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="text"
							{...register("email", {
								required: "Email Address is required",
							})}
						/>
						{errors.email && (
							<p className="text-red-600">{errors.email?.message}</p>
						)}
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be six character or longer",
								},
							})}
						/>
						{errors.password && (
							<p className="text-red-600">{errors.password?.message}</p>
						)}
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Select Account Type</span>
						</label>
						<select
							{...register("role", {
								required: "Role is required",
							})}
							className="select input-bordered w-full max-w-xs">
							<option value="Seller">Seller</option>
							<option value="Buyer">Buyer</option>
						</select>
					</div>
					<input
						className="btn btn-accent w-full mt-3"
						value="Login"
						type="submit"
					/>
					{signUError && <p>{signUError}</p>}
				</form>
				<p className="mt-3 text-center">
					Already have an account?{" "}
					<Link className="text-secondary" to="/login">
						Please login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
