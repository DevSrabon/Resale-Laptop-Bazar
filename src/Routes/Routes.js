
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout/DashboadrdLayout";
import Main from "../layout/Main/Main";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Payment from "../pages/Dashboard/Payment/Payment";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import MyProducts from "../pages/MyProducts/MyProducts";
import Products from "../pages/Products/Products";
import Page404 from "../pages/Shared/Page404/Page404";
import SignUp from "../pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		errorElement: <Page404 />,
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
				path: "/myproduct",
				element: <MyProducts />,
			},
			{
				path: "product/:id",
				element: (
					<PrivateRoute>
						<Products />
					</PrivateRoute>
				),
				loader: ({ params }) =>
					fetch(`${process.env.REACT_APP_API_URL}/product/${params.id}`),
			},
		],
	},

	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		errorElement: <Page404 />,
		children: [
			{
				path: "/dashboard",
				element: (
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				),
			},
			{
				path: "/dashboard/addproduct",
				element: <AddProduct />,
			},
			{
				path: "/dashboard/allusers",
				element: (
					<AdminRoute>
						<AllUsers />
					</AdminRoute>
				),
			},
			{
				path: "/dashboard/payment/:id",
				element: <Payment></Payment>,
				loader: ({ params }) =>
					fetch(`${process.env.REACT_APP_API_URL}/bookings/${params.id}`),
			},
		],
	},
	{
		path: "*",
		element: <Page404 />,
	},
]);