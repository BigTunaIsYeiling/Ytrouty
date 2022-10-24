import React from "react";
import ReactDOM from "react-dom/client";
import Apps from "./App";
import { HashRouter } from "react-router-dom";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <React.StrictMode>
      <Apps />
    </React.StrictMode>
  </HashRouter>
);
