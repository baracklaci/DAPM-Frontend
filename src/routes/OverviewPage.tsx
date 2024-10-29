import { Box } from "@mui/material";
import OrganizationSidebar from "../components/OverviewPage/OrganizationSidebar";
import PipelineAppBar from "../components/PipeLineComposer/PipelineAppBar";
import PipelineGrid from "../components/OverviewPage/PipelineGrid";

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
