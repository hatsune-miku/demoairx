import { Input } from "@mui/joy"
import { NodeApis } from "@/bridge/node-api"
import type { Configuration } from "@/bridge/node-api"
import { useState } from "react"
import Config from "@/bridge/config"

function TabConfiguration() {
  let [configs, setConfigs] = useState(NodeApis.getConfiguration())

  return (
    <div>
      {configs.map((config: Configuration, i: number) => {
        return (
          <div key={i}>
            <h4>{config.name}</h4>
            <Input
              value={config.value}
              onChange={(event) => {
                Config.setConfig(config.key, event.target.value)
                setConfigs(
                  configs.map((c) =>
                    c.name == config.name
                      ? { ...c, value: event.target.value }
                      : c
                  )
                )
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TabConfiguration
