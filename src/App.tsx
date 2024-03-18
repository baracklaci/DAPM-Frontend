import { AppBar, Box, ThemeProvider, createTheme } from "@mui/material";
import Flow from "./components/Flow";
import Sidebar from "./components/Sidebar";

import "./index.css";
import PipelineAppBar from "./components/PipelineAppBar";
import { Controls, Position, ReactFlowProvider } from "reactflow";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
      <ReactFlowProvider>
        <Flow />
        <Box sx={{ display: 'flex' }}>
          <PipelineAppBar />
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Sidebar />
            <Controls style={{position: 'fixed', bottom: '0px', left: '240px'}} />
          </Box>
        </Box>
      </ReactFlowProvider>
    </div>
    </ThemeProvider>
  );
}
