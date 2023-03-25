import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

const BOOK_CONTEXT = createContext(null);

const BookProvider = ({ children }) => {
	const { user } = useContext(AuthContext);

	const [bookings, setBookings] = useState([]);
	const [refetch, setRefetch] = useState(false);

	useEffect(() => {
		if (user?.email) {
			fetch(`${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			})
				.then((res) => res.json())
				.then((data) => setBookings(data));
		}
	}, [user?.email, refetch]);

	return (
		<BOOK_CONTEXT.Provider value={{ bookings, setRefetch }}>
			{children}
		</BOOK_CONTEXT.Provider>
	);
};
export const useBookData = () => {
	const context = useContext(BOOK_CONTEXT);
	return context;
};
export default BookProvider;
