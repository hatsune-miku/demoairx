import { Button, Chip, Grid } from "@mui/joy"
import { useState } from "react"
import { libairx_proxy as libairx } from "@/bridge/node-api"
import Config from "@/bridge/config"

function TabDashboard() {
  const [global, setGlobal] = useState({
    discoveryServiceOnline: !libairx.restore().isNull(),
    textServiceOnline: !libairx.restore().isNull(),
    airxPointer: Buffer.alloc(0),
  })
  const [peers, setPeers] = useState(
    libairx.getPeers(libairx.restore()).split(",")
  )

  function onRefreshClicked() {
    setPeers(libairx.getPeers(libairx.restore()).split(","))
  }

  const Pair = (props: { name: string; children: any }) => {
    return (
      <Grid container rowSpacing={2} lineHeight={2}>
        <Grid xs={2}></Grid>
        <Grid xs={4}>
          <b>{props.name}</b>
        </Grid>
        <Grid xs={4}>{props.children}</Grid>
        <Grid xs={2}></Grid>
      </Grid>
    )
  }
  const discoveryServicePort = Config.getConfig(
    Config.LAN_DISCOVERY_PORT,
    "9818"
  )
  const textTransmissionServicePort = Config.getConfig(
    Config.LAN_TEXT_SERVICE_PORT,
    "9819"
  )

  return (
    <div>
      <Pair name="libairx Status">
        <Chip size="sm" color="success">
          Connected
        </Chip>
      </Pair>

      <Pair name="libairx Version">
        <div>{libairx.version()}</div>
      </Pair>

      <Pair name="Discovery Service">
        <Chip
          size="sm"
          color={global.discoveryServiceOnline ? "success" : "danger"}
        >
          {global.discoveryServiceOnline
            ? `Online (${discoveryServicePort})`
            : "Offline"}
        </Chip>
      </Pair>

      <Pair name="Text Service">
        <Chip size="sm" color={global.textServiceOnline ? "success" : "danger"}>
          {global.textServiceOnline
            ? `Online (${textTransmissionServicePort})`
            : "Offline"}
        </Chip>
      </Pair>

      <Pair name="Current Peers">
        <Button onClick={onRefreshClicked} size="sm" color="primary">
          Refresh
        </Button>
        {peers.map((peer: string) => {
          return <div key={peer}>{peer}</div>
        })}
      </Pair>
    </div>
  )
}
export default TabDashboard
