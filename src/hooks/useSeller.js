import { useEffect, useState } from "react";


const useSeller = (email) => {
	const [isSeller, setIsSeller] = useState(false);
	console.log("🚀 ~ file: useSeller.js:5 ~ useSeller ~ isSeller:", isSeller)
	const [isSellerLoading, setIsSellerLoading] = useState(true);
	useEffect(() => {
		if (email) {
			fetch(`${process.env.REACT_APP_API_URL}/users/seller/${email}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setIsSeller(data.isSeller);
					setIsSellerLoading(false);
				});
		}
	}, [email]);
	return [isSeller, isSellerLoading];
};

export default useSeller;
