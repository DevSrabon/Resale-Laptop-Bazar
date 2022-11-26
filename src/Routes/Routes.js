
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout/DashboadrdLayout";
import Main from "../layout/Main/Main";
import AddProduct from "../pages/AddProduct/AddProduct";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard/addproduct',
                element:<AddProduct/>
            }
        ]
    }
])