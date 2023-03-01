import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({booking}) => {
    const[cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('');
    const[processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState();
    const {price, name, email, _id} = booking;
    useEffect(() => {
   
     fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
       method: "POST",
       headers: {
          "Content-Type": "application/json", 
          authorization:` bearer ${localStorage.getItem('accessToken')}`
         },
       body: JSON.stringify({price}),
     })
       .then((res) => res.json())
       .then((data) => setClientSecret(data.clientSecret));
   }, [price]);

    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit =async(event)=>{
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
        if(error){
            setCardError(error.message)
          }
          else{
            setCardError('')
          }
          setSuccess('')
          setProcessing(true)
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: name,
                  email: email
                },
              },
            },
          );
          if(confirmError){
            setCardError(confirmError.message)
            return;
          }
          if(paymentIntent.status==='succeeded'){
            setSuccess('Congrates ! Your payment successfully');
            setTransactionId(paymentIntent.id);
            const payments={
                   price,
                   transactionId: paymentIntent.id,
                   email,
                   bookingId: _id
            }
  
            fetch(`${process.env.REACT_APP_API_URL}/payments`, {
							method: "POST",
							headers: {
								"content-type": "application/json",
								authorization: ` bearer ${localStorage.getItem("accessToken")}`,
							},
							body: JSON.stringify(payments),
						})
							.then((res) => res.json())
							.then((data) => {
								if (data.insertedId) {
									setSuccess("Congrates ! Your payment successfully");
									setTransactionId(paymentIntent.id);
								}
							});
          }
          setProcessing(false)
    }
    return (
       <>
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
           <button className='btn btn-sm btn-primary mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
        </form>
        <p className='text-red-500'>{cardError}</p>
             {
        success && <div>
          <p className='text-green-500'>{success}</p>
          <p>Your TransactionId:  <span className='text-bold'>{transactionId}</span></p>
        </div>
       
      }
       </>
    );
};

export default CheckoutForm;