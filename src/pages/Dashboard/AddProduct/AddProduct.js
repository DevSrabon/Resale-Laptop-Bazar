import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddProduct = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const imageHostKey = process.env.REACT_APP_imgbb_key;

	const navigate = useNavigate();

	const date = new Date();
	console.log(date);

	const { data: categories, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = fetch(
				`${process.env.REACT_APP_API_URL}/homes`
			);
			const data = (await res).json();
			return data;
		},
	});

	const handleAddProduct = (data) => {
		const image = data.img[0];
		console.log(image);
		const formData = new FormData();
		formData.append("image", image);
		const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((imgData) => {
				if (imgData.success) {
					console.log(imgData.data.url);
					const doctor = {
						model: data.model,
						location: data.location,
						used: data.used,
						resellPrice: data.resellPrice,
						originalPrice: data.originalPrice,
						brand: data.brand,
						image: imgData.data.url,
						date
					};
					// save product information into the database
					fetch(`${process.env.REACT_APP_API_URL}/product`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
							// authorization: `bearer ${localStorage.getItem("accessToken")}`,
						},
						body: JSON.stringify(doctor),
					})
						.then((res) => res.json())
						.then((result) => {
							console.log(result);
							toast.success(`${data.brand} is added successfully`);
							navigate("/");
						});
				}
			});
	};
	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div className="w-96 mx-auto p-7 my-10 shadow-2xl rounded-lg">
			<h3 className="text-3xl"> Sell A Laptop</h3>
			<form onSubmit={handleSubmit(handleAddProduct)}>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Model</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="text"
						{...register("model", {
							required: "Model is required",
						})}
					/>
					{errors.model && (
						<p className="text-red-600">{errors.model?.message}</p>
					)}
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Location</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="text"
						{...register("location", {
							required: "Location is required",
						})}
					/>
					{errors.location && (
						<p className="text-red-600">{errors.location?.message}</p>
					)}
				</div>
				<div className="flex gap-3">
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Original Price</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="text"
							{...register("originalPrice", {
								required: "Original Price is required",
							})}
						/>
						{errors.originalPrice && (
							<p className="text-red-600">{errors.originalPrice?.message}</p>
						)}
					</div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Resale Price</span>
						</label>
						<input
							className="input input-bordered w-full max-w-xs"
							type="text"
							{...register("resellPrice", {
								required: "Resell Price is required",
							})}
						/>
						{errors.resellPrice && (
							<p className="text-red-600">{errors.resellPrice?.message}</p>
						)}
					</div>
				</div>

				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Year of Used</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="text"
						{...register("used", {
							required: "Year of used is required",
						})}
					/>
					{errors.used && (
						<p className="text-red-600">{errors.used?.message}</p>
					)}
				</div>

				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Description</span>
					</label>
					<textarea
						className="input input-bordered w-full max-w-xs"
						type="text"
						{...register("used", {
							required: "Year of used is required",
						})}
					/>
					{errors.used && (
						<p className="text-red-600">{errors.used?.message}</p>
					)}
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Brand</span>
					</label>
					<select
						{...register("brand")}
						className="select input-bordered w-full max-w-xs">
						{categories.map((category) => (
							<option key={category._id} value={category.brand}>
								{category.brand}
							</option>
						))}
					</select>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Phone Number</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="number"
						{...register("phone", {
							required: "Phone number is required",
							minLength: {
								value: 11,
								message: "Number Should be 11 character or longer",
							},
						})}
					/>
					{errors.phone && (
						<p className="text-red-600">{errors.phone?.message}</p>
					)}
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Photo</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="file"
						{...register("img", {
							required: "Photo is required",
						})}
					/>
					{errors.img && <p className="text-red-600">{errors.img?.message}</p>}
				</div>
				<input
					className="btn btn-accent w-full mt-3"
					value="Add Product"
					type="submit"
				/>
			</form>
		</div>
	);
};

export default AddProduct;
