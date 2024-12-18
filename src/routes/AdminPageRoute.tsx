import { Box } from "@mui/material";
import AdminUserListPage from "../components/AdminPage/AdminUserListPage";
import AdminSidebar from "../components/AdminPage/AdminSidebar";
import AdminEditPage from "../components/AdminPage/AdminEditPage";
import AdminActivityLogPage from "../components/AdminPage/AdminActivityLogPage"; // Adjust the path if needed

import { adminInfo } from "../redux/slices/userSlice";
import { useSelector } from 'react-redux';
import { RootState } from "../App";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";

export function AdminEditRoute() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AdminSidebar setRefreshKey = {setRefreshKey} />
                <AdminEditPage refreshKey = {refreshKey} />
            </Box>
        </div>
    );
}

export function AdminListRoute() {
    const [refreshKey, setRefreshKey] = useState(0);
    
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AdminSidebar setRefreshKey = {setRefreshKey} />
                
                <AdminUserListPage />
            </Box>
        </div>
    );



}
export const AdminActivityLogRoute = () => {
    return (
        <ProtectedRoute>
            <AdminActivityLogPage />
        </ProtectedRoute>
    );
};