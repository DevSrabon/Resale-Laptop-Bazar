import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ modal,  setModal }) => {
    const { user } = useContext(AuthContext);
    const {	
			brand,
			resellPrice,
		model,
			_id,
		} = modal;

	const handleBooking = (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const model = form.model.value;
		const price = form.price.value;
		const email = form.email.value;
		const phone = form.phone.value;
		const location = form.location.value;
		const booking = {
			pId: _id,
			name,
			price,
			email,
			phone,
            model,
			location,
		};
		fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(booking),
		})
			.then((res) => res.json())
			.then((data) => {
                if (data.acknowledged) {
                    setModal(null)
					toast.success("Booking Confirm");
				} else {
					toast.error(data.message);
				}
			});
	};
	return (
		<>
			<input type="checkbox" id="booking-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="booking-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<h3 className="text-lg font-bold">{brand}</h3>
					<form onSubmit={handleBooking} className="flex gap-5 flex-col mt-10">
						<input
							type="text"
							name="model"
							value={model}
							disabled
							className="input input-bordered w-full"
						/>

						<input
							type="text"
							defaultValue={user?.displayName}
							disabled
							name="name"
							placeholder="Your name"
							className="input input-bordered w-full"
						/>
						<input
							type="text"
							defaultValue={resellPrice}
							disabled
							name="price"
							placeholder=""
							className="input input-bordered w-full"
						/>
						<input
							defaultValue={user?.email}
							disabled
							type="email"
							name="email"
							placeholder="Your Email"
							className="input input-bordered w-full"
						/>
						<input
							type="text"
							name="phone"
							placeholder="Your phone number"
							className="input input-bordered w-full"
						/>
						<input
							type="text"
							name="location"
							placeholder="Your Location"
							className="input input-bordered w-full"
						/>

						<input
							htmlFor="booking-modal"
							className="btn btn-accent w-full text-white"
							type="submit"
							value="Submit"
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default BookingModal;