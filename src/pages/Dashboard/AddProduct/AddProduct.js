import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import SmallSpinner from "../../Shared/Loading/SmaillSpinner";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";

const AddProduct = () => {
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm();
const [loading, setLoading] = useState(false)
	const imageHostKey = process.env.REACT_APP_imgbb_key;

	const date = new Date();

	const { data: categories, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = fetch(`${process.env.REACT_APP_API_URL}/homes`);
			const data = (await res).json();
			return data;
		},
	});

	const { user } = useContext(AuthContext);

	const handleAddProduct = (data) => {
		setLoading(true);
		const image = data.img[0];
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
					const product = {
						email: user.email,
						name: user.displayName,
						model: data.model,
						condition: data.condition,
						location: data.location,
						purchase: data.purchase,
						description: data.description,
						resellPrice: parseFloat(data.resellPrice.replace(/,/g, "")),
						originalPrice: parseFloat(data.originalPrice.replace(/,/g, "")),
						brand: data.brand,
						image: imgData.data.url,
						date,
					};
					// save product information into the database
					fetch(`${process.env.REACT_APP_API_URL}/product`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
							authorization: `bearer ${localStorage.getItem("accessToken")}`,
						},
						body: JSON.stringify(product),
					})
						.then((res) => res.json())
						.then((result) => {
							toast.success(`${data.brand} is added successfully`);
							reset();
							setLoading(false);
						});
				}
			});
	};
	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div className=" p-7 my-10">
			<h3 className="text-3xl text-center font-semibold text-[green]">
				{" "}
				Sell A Laptop
			</h3>
			<form
				className="flex flex-col justify-evenly items-start gap-4 mt-5 md:flex-row md:gap-10"
				onSubmit={handleSubmit(handleAddProduct)}>
				<div className="w-full">
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Model</span>
						</label>
						<input
							className="input input-bordered w-full "
							type="text"
							{...register("model", {
								required: "Model is required",
								minLength: {
									value: 3,
									message: "Model Should be 3 character or longer",
								},
								maxLength: {
									value: 50,
									message:
										"Model Should not be more than 60 character or longer",
								},
							})}
						/>
						{errors.model && (
							<p className="text-red-600">{errors.model?.message}</p>
						)}
					</div>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Location</span>
						</label>
						<input
							className="input input-bordered w-full "
							type="text"
							{...register("location", {
								required: "Location is required",
							})}
						/>
						{errors.location && (
							<p className="text-red-600">{errors.location?.message}</p>
						)}
					</div>
					<div className="w-full">
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Original Price</span>
							</label>
							<input
								className="input input-bordered w-full "
								type="text"
								{...register("originalPrice", {
									required: "Original Price is required",
								})}
							/>
							{errors.originalPrice && (
								<p className="text-red-600">{errors.originalPrice?.message}</p>
							)}
						</div>
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Resale Price</span>
							</label>
							<input
								className="input input-bordered w-full "
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

					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<textarea
							className="textarea textarea-bordered textarea-lg  w-full"
							type="text"
							{...register("description", {
								required: "Description is required",
								minLength: {
									value: 30,
									message: "Description Should be 30 character or longer",
								},
								maxLength: {
									value: 85,
									message:
										"Description Should not be more than 85 character or longer",
								},
							})}
						/>
						{errors.description && (
							<p className="text-red-600">{errors.description?.message}</p>
						)}
					</div>
				</div>
				<div className="w-full">
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Year of purchase</span>
						</label>
						<input
							className="input input-bordered w-full "
							type="text"
							{...register("purchase", {
								required: "Year of purchase is required",
							})}
						/>
						{errors.purchase && (
							<p className="text-red-600">{errors.purchase?.message}</p>
						)}
					</div>

					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Brand</span>
						</label>
						<select
							{...register("brand")}
							className="select input-bordered w-full ">
							{categories?.map((category) => (
								<option key={category._id} value={category.brand}>
									{category.brand}
								</option>
							))}
						</select>
					</div>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Condition</span>
						</label>
						<select
							{...register("condition", {
								required: "Condition is required",
							})}
							className="select input-bordered w-full ">
							<option value="Good">Good</option>
							<option value="Bad">Bad</option>
							<option value="Excellent">Excellent</option>
						</select>
					</div>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Phone Number</span>
						</label>
						<input
							className="input input-bordered w-full "
							type="number"
							{...register("phone", {
								required: "Phone number is required",
								minLength: {
									value: 11,
									message: "Number Should be 11 character or longer",
								},
								maxLength: {
									value: 16,
									message:
										"Number Should not be more than 16 character or longer",
								},
							})}
						/>
						{errors.phone && (
							<p className="text-red-600">{errors.phone?.message}</p>
						)}
					</div>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Photo</span>
						</label>
						<input
							className="input input-bordered w-full "
							type="file"
							{...register("img", {
								required: "Photo is required",
							})}
						/>
						{errors.img && (
							<p className="text-red-600">{errors.img?.message}</p>
						)}
					</div>
					<PrimaryButton
						disabled={loading}
						classes={"w-full mt-3"}
						type={"submit"}>
						{loading ? <SmallSpinner /> : "Add Product"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
