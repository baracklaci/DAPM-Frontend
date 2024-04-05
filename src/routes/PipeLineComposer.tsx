import { AppBar, Box, ThemeProvider, createTheme } from "@mui/material";
import Flow from "../components/Flow";
import Sidebar from "../components/NodesSidebar";

import PipelineAppBar from "../components/PipelineAppBar";
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