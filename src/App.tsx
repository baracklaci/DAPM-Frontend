import { AppBar, Box, ThemeProvider, createTheme } from "@mui/material";
import Flow from "./components/Flow";
import Sidebar from "./components/NodesSidebar";

import "./index.css";
import PipelineAppBar from "./components/PipelineAppBar";
import { Controls, Position, ReactFlowProvider } from "reactflow";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/slices";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const store = configureStore({
  reducer: rootReducer,
})

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
    <Provider store={store}>
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
    </Provider>
    </div>
    </ThemeProvider>
  );
}
