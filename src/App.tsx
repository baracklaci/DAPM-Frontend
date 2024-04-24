import { ThemeProvider, createTheme } from "@mui/material";

import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/slices";

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { RouterProvider, createHashRouter } from "react-router-dom";
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

const router = createHashRouter([
  {
    path: "/",
    element: <UserPage/>,

  },
  {
    path: "/pipeline",
    element: <PipelineComposer/>,
  }
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
