import { Divider, Input } from "@mui/joy"
import { NodeApis } from "@/bridge/node-api"
import type { Configuration } from "@/bridge/node-api"
import { Box } from "@mui/system"
import React, { useState } from "react"
import Global from "@/bridge/global"

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
                setConfigs(
                  configs.map((c) =>
                    c.name == config.name
                      ? { ...c, value: event.target.value }
                      : c
                  )
                )
              }}
            />
            <Divider />
          </div>
        )
      })}
    </div>
  )
}

export default TabConfiguration
