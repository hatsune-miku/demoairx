import React, { useState } from "react"
import "./App.scss"
import Main from "./components/Main"
import { libairx_proxy as libairx } from "./bridge/node-api"

const UserContext = React.createContext({})

function App() {
  return (
    <div className="main-div">
      <Main></Main>
    </div>
  )
}

export { UserContext, App }
