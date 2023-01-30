import React, { useState } from "react"
import "./App.scss"
import Main from "./components/Main"
import { libairx_proxy as libairx } from "./bridge/node-api"

const UserContext = React.createContext({})

function App() {
  const [global, setGlobal] = useState({
    discoveryServiceOnline: !libairx.restore().isNull(),
    textServiceOnline: !libairx.restore().isNull(),
    airxPointer: Buffer.alloc(0),
  })

  return (
    <div className="main-div">
      <UserContext.Provider value={[global, setGlobal]}>
        <Main></Main>
      </UserContext.Provider>
    </div>
  )
}

export { UserContext, App }
