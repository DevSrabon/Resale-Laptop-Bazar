import React from 'react';

const Login = () => {
    return (
			<div className="h-[800px] flex justify-center items-center ">
				{/* <div className="w-96 p-7 shadow-2xl">
					<h2 className="text-xl text-center">Login</h2>
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
						<input
							className="btn btn-accent w-full"
							value="Login"
							type="submit"
						/>
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
					<div className="divider">OR</div>
					<button
						onClick={handleGoogleSignIn}
						className="btn btn-outline w-full">
						CONTINUE WITH GOOGLE
					</button>
				</div> */}
			</div>
		);
};

export default Login;