import { useEffect, useState } from "react";

const useToken = (email) => {
	const [token, setToken] = useState("");
	useEffect(() => {
		if (email) {
			fetch(`${process.env.REACT_APP_API_URL}/jwt?email=${email}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.accessToken) {
						localStorage.setItem("accessToken", data.accessToken);
						setToken(data.accessToken);
					}
				});
		}
	}, [email]);
	return [token];
};
export default useToken;
