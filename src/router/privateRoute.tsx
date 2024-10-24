import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
export default function PrivateRoute(){
    const user=useAuth();
    console.log("I am token:", user)
    if(!user?.token) return <Navigate to="/login"/>
    return <Outlet></Outlet>
}