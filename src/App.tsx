import { ThemeProvider, createTheme } from "@mui/material";

import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/slices";

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PipelineComposer from "./routes/PipeLineComposer";
import UserPage from "./routes/UserPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Account from "./routes/Account";
import { useEffect, useState } from "react";
import { loadState, saveState } from "./redux/browser-storage";
import { getAuth } from "./services/authAPI";

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


export default function App() {

  

  const routes = [
    {
      path: "/",
      element: <UserPage/>,

    },
    {
      path: "/pipeline",
      element: <PipelineComposer/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/account",
      element: <Account />,
    },
  ];

  useEffect(() => {
    // queryAuth();
    setPath(window.location.pathname);
  }, []);

  const [path, setPath] = useState('');
  const [auth, setAuth] = useState(true);

  const queryAuth = () => {
    const path = window.location.pathname;
    if (path !== '/login' && path !== '/register' && path !== '/') {
      getAuth().then((result) => {
        result.json().then(response => {
          const { code } = response;
          if (code !== 200) {
            console.log('Current authentication failure');
            setAuth(false);
          }
        });
      });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
              {
                routes.map(({ path, element, ...route }) =>
                  <Route
                    key={path}
                    path={path}
                    element={(auth || path === '/login' || path === '/register' || path === '/') ? element : <Navigate to='/login' />}
                    {...route}
                  />
                )
              }
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </ThemeProvider>
  );
}
