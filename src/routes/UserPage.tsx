import { Box, Button } from "@mui/material";
import OrganizationSidebar from "../components/UserPage/OrganizationSidebar";
import PipelineAppBar from "../components/PipeLineComposer/PipelineAppBar";
import PipelineGrid from "../components/UserPage/PipelineGrid";
import LoginIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

export default function UserPage() {

    const navigate = useNavigate();

    const Token = sessionStorage.getItem('Token');

    return (
        <div>
            
            {
                !!Token ?
                <Button variant="outlined" size={"small"} sx={{position: "fixed", right: 10, top: 10}} onClick={() => navigate("/account")}>my page</Button>
                :
                <Button variant="outlined" size={"small"} sx={{position: "fixed", right: 10, top: 10}} startIcon={<LoginIcon/>} onClick={() => navigate("/login")}>Login</Button>
            }
            <Box sx={{display: 'flex'}}>
                <OrganizationSidebar />
                <PipelineGrid />
            </Box>
        </div>
    )
}