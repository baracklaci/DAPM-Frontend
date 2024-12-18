import { AppBar, Box, ThemeProvider, createTheme } from "@mui/material";
import Flow from "../components/PipeLineComposer/Flow";
import Sidebar from "../components/PipeLineComposer/NodesSidebar";

import PipelineInsAppBar from "../components/PipelineInstantiation/PipelineInsAppBar";
import { Controls, Position, ReactFlowProvider } from "reactflow";


export default function PipelineInstantiation(){
    return (
        <ReactFlowProvider>
            <Flow />
            <Box sx={{ display: 'flex' }}>
            <PipelineInsAppBar />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* <Sidebar /> */}
                <Controls style={{ position: 'fixed', bottom: '0px', left: '240px' }} />
            </Box>
            </Box>
        </ReactFlowProvider>
    )
}