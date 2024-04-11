import { Box } from "@mui/material";
import OrganizationSidebar from "../components/UserPage/OrganizationSidebar";
import PipelineAppBar from "../components/PipeLineComposer/PipelineAppBar";
import PipelineGrid from "../components/UserPage/PipelineGrid";

export default function UserPage() {
    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <OrganizationSidebar />
                <PipelineGrid />
            </Box>
        </div>
    )
}