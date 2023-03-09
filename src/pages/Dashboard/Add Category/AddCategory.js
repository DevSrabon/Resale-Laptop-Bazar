import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../Shared/Loading/SmaillSpinner";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";

const AddCategory = () => {
    	const {
				register,
				reset,
				formState: { errors },
				handleSubmit,
			} = useForm();
			const [loading, setLoading] = useState(false);
			const imageHostKey = process.env.REACT_APP_imgbb_key;
	const handleAddCategory = (data) => {
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
                        brand: data.brand,
                        img: imgData.data.url,
                    }
					// save product information into the database
					fetch(`${process.env.REACT_APP_API_URL}/category`, {
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
	return (
		<div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 w-3/4 mx-auto my-20">
			<form className="space-y-2" onSubmit={handleSubmit(handleAddCategory)}>
				<h5 className="text-xl font-medium text-gray-900 dark:text-white">
					Add A Category
				</h5>
				<div>
					<div className="w-full">
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Brand Name</span>
							</label>
							<input
								className="input input-bordered w-full "
								type="text"
								{...register("brand", {
									required: "Brand is required",
								})}
							/>
							{errors.originalPrice && (
								<p className="text-red-600">{errors.originalPrice?.message}</p>
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
				</div>
				
			</form>
		</div>
	);
};

export default AddCategory;
