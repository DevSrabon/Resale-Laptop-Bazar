import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useNavigation } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { styles } from "../../../styles";
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
		<div className=" mt-10 pb-10">
			<h3 className={`${styles.SectionHeadText}`}>Payment for {model}</h3>
			<p className={`${styles.SectionSubText}`}>
				Please pay <strong>${price}</strong> for your purchase on {model}{" "}
			</p>
			<div className="w-96 my-12 mx-auto">
				{" "}
				<Elements stripe={stripePromise}>
					<CheckOutForm booking={booking} />
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
