
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout/DashboadrdLayout";
import Main from "../layout/Main/Main";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";
import SignUp from "../pages/SignUp/SignUp";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "product/:id",
				element: <Products />,
				loader: ({ params }) =>
					fetch(`${process.env.REACT_APP_API_URL}/product/${params.id}`),
			},
		],
	},

	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				path: "/dashboard/addproduct",
				element: <AddProduct />,
			},
			{
				path: "/dashboard/allusers",
				element: <AllUsers />,
			},
		],
	},
]);