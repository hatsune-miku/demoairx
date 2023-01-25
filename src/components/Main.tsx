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

function Main() {
  const { mode, setMode } = useColorScheme()

  function toggleMode() {
    setMode(mode === "light" ? "dark" : "light")
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

      <h3>libairx Control Panel</h3>

      <Tabs
        aria-label="Basic tabs"
        defaultValue={0}
        sx={{ borderRadius: "lg" }}
      >
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Configuration</Tab>
          <Tab>About libairx</Tab>
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
