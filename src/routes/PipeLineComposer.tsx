import { AppBar, Box, ThemeProvider, createTheme } from "@mui/material";
import Flow from "../components/PipeLineComposer/Flow";
import Sidebar from "../components/PipeLineComposer/NodesSidebar";

import PipelineAppBar from "../components/PipeLineComposer/PipelineAppBar";
import { Controls, Position, ReactFlowProvider } from "reactflow";


export default function PipelineComposer(){
    return (
        <ReactFlowProvider>
            <Flow />
            <Box sx={{ display: 'flex' }}>
            <PipelineAppBar />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Sidebar />
                <Controls style={{ position: 'fixed', bottom: '0px', left: '240px' }} />
            </Box>
            </Box>
        </ReactFlowProvider>
    )
}
