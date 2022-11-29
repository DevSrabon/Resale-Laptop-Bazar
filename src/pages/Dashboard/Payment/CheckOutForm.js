import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckOutForm = ({ booking }) => {
    console.log(booking);
	const { price, email, model, _id } = booking;
	const [cardError, setCardError] = useState("");
	const [success, setSuccess] = useState("");
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState("");
	const stripe = useStripe();
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);

		if (card == null) {
			return;
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});
		if (error) {
			console.log(error);
			setCardError(error.message);
		} else {
			setCardError("");
		}
		setSuccess("");
		setProcessing(true);

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: model,
						email: email,
					},
				},
			});
		if (confirmError) {
			setCardError(confirmError.message);
			return;
		}
		console.log("card info", card);
		if (paymentIntent.status === "succeeded") {
			// store payment info in the database
			const payment = {
				price,
				transactionId: paymentIntent.id,
				email,
				bookingId: _id,
			};
			fetch(`${process.env.REACT_APP_API_URL}/payments`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					authorization: `bearer ${localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify(payment),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.insertedId) {
						setSuccess("Congrats! Your payment completed");
						setTransactionId(paymentIntent.id);
						toast.success("Payment has been success!");
					}
				});
		}
		setProcessing(false);
		console.log("paymentIntent", paymentIntent);
	};

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({ price }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [price]);
	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				<button
					className="btn btn-secondary btn-xs text-white mt-4"
					type="submit"
					disabled={!stripe || !clientSecret || processing}>
					Pay
				</button>
			</form>
			<p className="text-red-500">{cardError}</p>
			{success && (
				<div>
					<p className="text-green-400">{success}</p>
					<p className="text-green-400">
						Your transaction Id:{" "}
						<span className="font-bold">{transactionId}</span>
					</p>
				</div>
			)}
		</>
	);
};

export default CheckOutForm;
