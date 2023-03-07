import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useNavigation } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
	const booking = useLoaderData();
	const navigation = useNavigation();
	const { model, price } = booking;
	if (navigation.state === "loading") {
		return <Loading></Loading>;
	}
	return (
		<div>
			<h3 className="text-3xl">Payment for {model}</h3>
			<p className="text-xl mt-4 text-[navy]">
				Please pay <strong>${price}</strong> for your appointment on{" "}
				
			</p>
			<div className="w-96 my-12">
				{" "}
				<Elements stripe={stripePromise}>
					<CheckOutForm booking={booking}/>
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
