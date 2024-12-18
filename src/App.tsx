import { ThemeProvider, createTheme } from "@mui/material";

import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/slices";
import ProtectedRoute from "./routes/ProtectedRoute";

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import PipelineComposer from "./routes/PipeLineComposer";
import UserPage from "./routes/OverviewPage";
import LoginPage from "./routes/LoginPage";
import {AdminEditRoute, AdminListRoute} from "./routes/AdminPageRoute";
import { loadState, saveState } from "./redux/browser-storage";
import AdminActivityLogPage from "./components/AdminPage/AdminActivityLogPage";
import PipelineInstantiation from "./routes/PipeLineInstantiation";

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
  preloadedState: loadState(),
})

// here we subscribe to the store changes
store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  () => saveState(store.getState())
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "/pipelineInstantiation",
    element: (
      <ProtectedRoute>
        <PipelineInstantiation/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/pipelineTemplate",
    element: (
      <ProtectedRoute>
        <PipelineComposer/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admineditpage",
    element: (
      <ProtectedRoute>
        <AdminEditRoute/>
      </ProtectedRoute>
      ),
  },
  {
    path: "/adminlistpage",
    element: (
      <ProtectedRoute>
        <AdminListRoute/>
      </ProtectedRoute>
      ),
  },
  {
    path: "/userpage",
    element: (
      <ProtectedRoute>
        <UserPage/>
      </ProtectedRoute>
      ),
  },
  {
    path: "/adminactivitylogpage", // Add the route here
    element: (
        <ProtectedRoute>
            <AdminActivityLogPage />
        </ProtectedRoute>
    ),
},
]);


export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </div>
    </ThemeProvider>
  );
}
