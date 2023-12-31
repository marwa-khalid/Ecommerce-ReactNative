
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/redux/UserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store = {store}>
     <App />
    </Provider>
  </BrowserRouter>
);
