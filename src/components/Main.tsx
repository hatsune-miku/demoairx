import {
  Alert,
  Button,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  useColorScheme,
} from "@mui/joy"

import TabDashboard from "./TabDashboard"
import TabConfiguration from "./TabConfiguration"
import TabAbout from "./TabAbout"
import { libairx_proxy as libairx } from "@/bridge/node-api"
import Config from "@/bridge/config"
import { useContext, useEffect } from "react"
import { UserContext } from "@/App"

function Main() {
  const { mode, setMode } = useColorScheme()
  function toggleMode() {
    setMode(mode === "light" ? "dark" : "light")
  }
  const [global, setGlobal] = useContext(UserContext)

  if (libairx.isFirstRun()) {
    console.log("App: Initialized")

    let airxPointer = libairx.createService(
      parseInt(Config.getConfig(Config.LAN_DISCOVERY_PORT, "9818")),
      0,
      "0.0.0.0",
      parseInt(Config.getConfig(Config.LAN_TEXT_SERVICE_PORT, "9819"))
    )

    console.log(
      "App: airx struct pointer 0x" + airxPointer.address().toString(16)
    )

    libairx.lanDiscoveryServiceAsync(airxPointer)
    libairx.textServiceAsync(airxPointer)
    libairx.startAutoBroadcast(airxPointer)

    setTimeout(() => {
      console.log("App: Discovery service online")
      setGlobal({
        ...global,
        discoveryServiceOnline: !libairx.restore().isNull(),
        textServiceOnline: !libairx.restore().isNull(),
      })
    }, 700)
  }

  return (
    <div className="main">
      <Alert
        sx={{
          mb: 1.5,
          mt: 1.5,
        }}
        variant="soft"
      >
        <b>
          This is only a *demo version* of libairx written in slow and fat
          Electron framework. It is not a part of ENGI-981A final project.
        </b>
      </Alert>

      <h3>Control Panel</h3>

      <Tabs
        aria-label="Basic tabs"
        defaultValue={0}
        sx={{ borderRadius: "lg" }}
      >
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Configuration</Tab>
          <Tab>About</Tab>
        </TabList>
        <TabPanel value={0} sx={{ p: 2 }}>
          <TabDashboard></TabDashboard>
        </TabPanel>
        <TabPanel value={1} sx={{ p: 2 }}>
          <TabConfiguration></TabConfiguration>
        </TabPanel>
        <TabPanel value={2} sx={{ p: 2 }}>
          <TabAbout></TabAbout>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Main
