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
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PipelineComposer from "./routes/PipeLineComposer";
import UserPage from "./routes/UserPage";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserPage/>,

  },
  {
    path: "/pipeline",
    element: <PipelineComposer/>,

  }
]);

export const persistor = persistStore(store);

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </div>
    </ThemeProvider>
  );
}
