import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";
import { BiUserCircle } from "react-icons/bi";
import PrimaryButton from "../Shared/PrimaryButton/PrimaryButton";
import SmallSpinner from "../Shared/Loading/SmaillSpinner";
const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const { signIn, googleLogin, setLoading, loading } = useContext(AuthContext);
	const [loginError, setLoginError] = useState("");
	const [loginUserEmail, setLoginUserEmail] = useState("");
	const [token] = useToken(loginUserEmail);
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from?.pathname || "/";
	useEffect(() => {
	
		if (token) {
			navigate(from, { replace: true });
		}
	}, [from, navigate, token])
	
	const handleLogin = (data) => {
		setLoginError("");
		signIn(data.email, data.password)
			.then((result) => {
				const user = result.user;
				setLoginUserEmail(data.email);
				setLoading(false)
				toast.success('Login Success')
			})
			.catch((error) => {
				setLoginError(error.message);
				setLoading(false);
			});
	};
	const handleGoogleSignIn = () => {
		setLoginError("");
		googleLogin()
			.then((result) => {
				const user = result.user;
				setLoginUserEmail(user.email)
				savedUser(user.displayName, user.email, 'Buyer')
				toast.success("Login Success");
				setLoading(false);

			})
			.catch(error => {
				setLoginError(error.message);
				setLoading(false);
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
				setLoginUserEmail(email);
			});
	};

	return (
		<div className="h-[800px] flex justify-center items-center ">
			<div className="w-96 p-7 shadow-2xl">
				<span className="flex justify-center">
					<BiUserCircle className="text-8xl text-[navy]" />
				</span>
				<h2 className="text-xl font-bold text-center text-[navy]">Login</h2>
				<form onSubmit={handleSubmit(handleLogin)}>
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
						<label className="label">
							<span className="label-text">Forget password</span>
						</label>
					</div>
					<PrimaryButton disabled={loading} type={"submit"} classes ={"w-full"}>{loading ? <SmallSpinner /> : 'Login'}</PrimaryButton>
					<div>
						{loginError && <p className="text-red-600">{loginError}</p>}
					</div>
				</form>
				<p className="mt-3 text-center">
					New to Doctors Portal{" "}
					<Link className="text-secondary" to="/signup">
						Create new account
					</Link>
				</p>
				<div className="divider text-stone-400">OR</div>
				<button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
					CONTINUE WITH GOOGLE
				</button>
			</div>
		</div>
	);
};

export default Login;
