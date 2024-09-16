import {
  createBrowserRouter,
} from "react-router-dom";import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Payment from "../pages/Payment";
const router = 

createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/payment',
        element: <Payment/>
      },
    ]
  },
]);

export default router;