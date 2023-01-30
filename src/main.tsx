import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./global.scss"

import "@fontsource/public-sans"
import { CssVarsProvider, extendTheme } from "@mui/joy"

const paletteLovely = {
  plainColor: "#fb7299ff",
  plainHoverBg: "#fb729922",
  plainActiveBg: "#fb729944",
}

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        warning: paletteLovely,
      },
    },
    dark: {
      palette: {
        warning: paletteLovely,
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={customTheme}>
      <App />
    </CssVarsProvider>
  </React.StrictMode>
)

postMessage({ payload: "removeLoading" }, "*")
