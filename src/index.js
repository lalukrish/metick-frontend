// Assuming you have a valid Redux store set up in './redux/store/store'
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client";
//import dotenv from "dotenv";
import "./index.css";
import App from "./App";
import { store } from "./Redux/store/store";
//dotenv.config();

const root = document.getElementById("root");
const rootElement = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
const rootContainer = createRoot(root);
rootContainer.render(rootElement);
