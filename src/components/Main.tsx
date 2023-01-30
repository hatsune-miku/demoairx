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
import ClipboardJS from "clipboard"
import Global from "@/bridge/global"

// A function that never got gc-ed
global.shared = {}

function Main() {
  const { mode, setMode } = useColorScheme()
  function toggleMode() {
    setMode(mode === "light" ? "dark" : "light")
  }
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
    libairx.textServiceAsync(airxPointer, (s: string) => {
      console.log("App: Text service received: " + s)
      ClipboardJS.copy(s)
    })
    libairx.startAutoBroadcast(airxPointer)

    let clipboard = ""
    function listenClipboard() {
      window.navigator.clipboard
        .readText()
        .then((new_clip) => {
          if (new_clip !== clipboard) {
            clipboard = new_clip
            console.log("App: Clipboard changed: " + clipboard)
            libairx.broadcastText(airxPointer, clipboard)
            console.log("App: Text broadcasted.")
          }
        })
        .catch((_) => {})
      setTimeout(listenClipboard, 500)
    }
    listenClipboard()
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
