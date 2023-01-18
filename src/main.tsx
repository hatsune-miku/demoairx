import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.scss";

import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider>
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
