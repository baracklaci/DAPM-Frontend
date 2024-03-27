import { AppBar, Box, ThemeProvider, createTheme } from "@mui/material";
import Flow from "./components/Flow";
import Sidebar from "./components/NodesSidebar";

import "./index.css";
import PipelineAppBar from "./components/PipelineAppBar";
import { Controls, Position, ReactFlowProvider } from "reactflow";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/slices";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
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
          </PersistGate>
        </Provider>
      </div>
    </ThemeProvider>
  );
}
