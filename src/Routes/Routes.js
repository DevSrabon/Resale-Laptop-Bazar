
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout/DashboadrdLayout";
import Main from "../layout/Main/Main";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import MyProducts from "../pages/MyProducts/MyProducts";
import Products from "../pages/Products/Products";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

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
				path: "/myproduct",
				element: <MyProducts />,
			},
			{
				path: "product/:id",
				element: <PrivateRoute><Products/></PrivateRoute>,
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
				path: '/dashboard',
				element: <Dashboard/>
			}
		,
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